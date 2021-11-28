import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import {ProductTypeDto} from '../../api/src';
import {
  mapRefreshableValues,
  notLoaded,
  wrapRefreshablePromise,
} from '../../utils';
import {debounce} from 'ts-debounce';
import stores from '../index';

class ProductSearchStore {
  input: string = '';
  items: RefreshableAsyncState<ProductTypeDto[]> = notLoaded();

  constructor() {
    makeAutoObservable(this, {
      input: observable,
      setInput: action.bound,
      sortedItems: computed,
    });
    this.load();
  }

  get sortedItems(): RefreshableAsyncState<
    {a: ProductTypeDto; b: ProductTypeDto | undefined}[]
  > {
    return mapRefreshableValues(this.items, (v) => {
      const ret: {a: ProductTypeDto; b: ProductTypeDto | undefined}[] = [];
      for (let i = 0; i < Math.floor(v.length / 2); i++) {
        ret.push({a: v[i * 2], b: v[i * 2 + 1]});
      }
      if (v.length % 2 !== 0) {
        ret.push({a: v[v.length - 1], b: undefined});
      }
      return ret;
    });
  }

  load = debounce(() => {
    void wrapRefreshablePromise(
      stores.api.user.searchProducts({q: this.input}),
      this.items,
      (v) => runInAction(() => (this.items = v)),
    );
  }, 300);

  setInput(input: string): void {
    this.input = input;
    this.load();
  }
}

export default ProductSearchStore;
