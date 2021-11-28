export function notLoaded<T>(): AsyncState<T> & RefreshableAsyncState<T> {
  return {
    status: 'not-requested',
  };
}

export function wrapPromise<T>(
  promise: Promise<T>,
  source: AsyncState<T>,
  set: (v: AsyncState<T>) => void,
): Promise<void> {
  if (source.token) {
    source.token.cancelled = true;
  }
  const token: StateToken = {cancelled: false};
  set({status: 'loading', token});
  return promise
    .then((value) => {
      if (!token.cancelled) {
        set({status: 'success', result: value, token});
      } else {
        //FIXME dropping promise onThen
      }
    })
    .catch((reason: Error) => {
      if (!token.cancelled) {
        set({status: 'error', error: reason, token});
      } else {
        //FIXME dropping promise onError
      }
    });
}

export function wrapRefreshablePromise<T>(
  promise: Promise<T>,
  source: RefreshableAsyncState<T>,
  set: (v: RefreshableAsyncState<T>) => void,
  key?: string,
): Promise<T> {
  if (source.token) {
    source.token.cancelled = true;
  }
  const token: StateToken = {cancelled: false};
  if (source.status === 'success' && source.key === key) {
    set({
      status: 'refreshing-success',
      result: source.result,
      key,
      token,
    });
  } else if (source.status === 'error' && source.key === key) {
    set({
      status: 'refreshing-error',
      error: source.error,
      key,
      token,
    });
  } else if (source.status !== 'loading') {
    set({
      status: 'loading',
      key,
      token,
    });
  }
  return promise
    .then((value) => {
      if (!token.cancelled) {
        set({
          status: 'success',
          result: value,
          key,
          token,
        });
      } else {
        //FIXME dropping promise onThen
      }
      return value;
    })
    .catch((reason: Error) => {
      if (!token.cancelled) {
        set({
          status: 'error',
          error: reason,
          key,
          token,
        });
      } else {
        //FIXME dropping promise onError
      }
      return Promise.reject(reason);
    });
}

export function mergeRefreshablePromiseStates<A, B, C>(
  a: RefreshableAsyncState<A>,
  b: RefreshableAsyncState<B>,
  merger: (first: A, second: B) => C,
): RefreshableAsyncState<C> {
  if (a.status === 'loading' || b.status === 'loading') {
    return {
      status: 'loading',
    };
  } else if (a.status === 'error' || a.status === 'refreshing-error') {
    return {
      status: 'error',
      error: a.error,
    };
  } else if (b.status === 'error' || b.status === 'refreshing-error') {
    return {
      status: 'error',
      error: b.error,
    };
  } else if (a.status === 'not-requested' || b.status === 'not-requested') {
    return {
      status: 'not-requested',
    };
  } else if (
    (a.status === 'refreshing-success' || a.status === 'success') &&
    (b.status === 'refreshing-success' || b.status === 'success')
  ) {
    if (!a.result && !b.result) {
      return {
        status: 'loading',
      };
    }
    return {
      status:
        a.status === 'refreshing-success' || b.status === 'refreshing-success'
          ? 'refreshing-success'
          : 'success',
      result: merger(a.result, b.result),
    };
  } else {
    throw new Error(
      `Unknown state for a: ${JSON.stringify(a)} and b: ${JSON.stringify(b)}`,
    );
  }
}

export function mergePromiseStates<A, B, C>(
  a: AsyncState<A>,
  b: AsyncState<B>,
  merger: (first: A, second: B) => C,
): AsyncState<C> {
  if (a.status === 'loading' || b.status === 'loading') {
    return {
      status: 'loading',
    };
  } else if (a.status === 'error') {
    return {
      status: 'error',
      error: a.error,
    };
  } else if (b.status === 'error') {
    return {
      status: 'error',
      error: b.error,
    };
  } else if (a.status === 'not-requested' || b.status === 'not-requested') {
    return {
      status: 'not-requested',
    };
  } else if (a.status === 'success' && b.status === 'success') {
    if (!a.result && !b.result) {
      return {
        status: 'loading',
      };
    }
    return {
      status: 'success',
      result: merger(a.result, b.result),
    };
  } else {
    throw new Error(
      `Unknown state for a: ${JSON.stringify(a)} and b: ${JSON.stringify(b)}`,
    );
  }
}

export function mapRefreshableValues<A, B>(
  s: RefreshableAsyncState<A>,
  map: (v: A) => B,
): RefreshableAsyncState<B> {
  if (s.status === 'success' || s.status === 'refreshing-success') {
    return {
      ...s,
      result: map(s.result),
    };
  } else {
    return s;
  }
}

export function mapValues<A, B>(
  s: AsyncState<A>,
  map: (v: A) => B,
): AsyncState<B> {
  if (s.status === 'success') {
    return {
      ...s,
      result: map(s.result),
    };
  } else {
    return s;
  }
}

export function ifSuccessful<T, R>(
  state: AsyncState<T> | RefreshableAsyncState<T>,
  map: (t: T) => R,
  def: R | (() => R),
): R {
  if (state.status === 'success' || state.status === 'refreshing-success') {
    return map(state.result);
  } else {
    return def instanceof Function ? def() : def;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
