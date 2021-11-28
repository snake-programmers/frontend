declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.jpg' {}
declare module '*.png' {}

declare interface StateToken {
  cancelled: boolean;
}

declare type AsyncState<R> = (
  | {
      status: 'not-requested';
    }
  | {
      status: 'loading';
    }
  | {
      status: 'success';
      result: R;
    }
  | {
      status: 'error';
      error: Error;
    }
) & {token?: StateToken};

declare type RefreshableAsyncState<R> = (
  | {
      status: 'not-requested';
    }
  | {
      status: 'loading';
    }
  | {
      status: 'success';
      result: R;
    }
  | {
      status: 'error';
      error: Error;
    }
  | {
      status: 'refreshing-success';
      result: R;
    }
  | {
      status: 'refreshing-error';
      error: Error;
    }
) & {key?: string; token?: StateToken};
