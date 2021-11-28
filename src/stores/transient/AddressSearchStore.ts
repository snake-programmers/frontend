import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {AddressDto} from '../../api/src';
import {notLoaded, wrapRefreshablePromise} from '../../utils';
import {debounce} from 'ts-debounce';
import stores from '../index';

class AddressSearchStore {
  input: string = '';
  items: RefreshableAsyncState<AddressDto[]> = notLoaded();

  constructor() {
    makeAutoObservable(this, {
      input: observable,
      items: observable,
      setInput: action.bound,
    });
    this.query();
  }

  query = debounce(() => {
    void wrapRefreshablePromise(
      stores.api.suggest.addressSuggestGet({input: this.input}),
      this.items,
      (v) => runInAction(() => (this.items = v)),
    );
  }, 300);

  setInput(input: string) {
    this.input = input;
    this.query();
  }
}

export default AddressSearchStore;
