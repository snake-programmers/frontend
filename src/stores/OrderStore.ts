import {NearestProductDto, OrderDto, ProductTypeDto} from '../api/src';
import {notLoaded, wrapRefreshablePromise} from '../utils';
import stores from './index';
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';

export interface CardItemDto {
  id: number;
  product: NearestProductDto;
  type: ProductTypeDto;
  amount: number;
}

class OrderStore {
  private internalIdCounter: number = 0;
  orders: RefreshableAsyncState<OrderDto[]> = notLoaded();
  card: CardItemDto[] = [];

  constructor() {
    makeAutoObservable(this, {
      orders: observable,
      card: observable.deep,
      cardWithEnd: computed,
      load: action,
      addToCard: action,
      changeAmount: action,
      deleteItem: action,
    });
  }

  get cardWithEnd(): (CardItemDto | 'end')[] {
    return [...this.card, 'end'];
  }

  load(): void {
    void wrapRefreshablePromise(stores.api.user.getOrders(), this.orders, (v) =>
      runInAction(() => (this.orders = v)),
    );
  }

  addToCard(item: CardItemDto) {
    item.id = this.internalIdCounter++;
    this.card.push(item);
  }

  changeAmount(item: CardItemDto, amount: number) {
    if (amount <= 0) {
      return;
    }
    const idx = this.card.findIndex((value) => value.id === item.id);
    if (idx === -1) {
      return;
    }
    const n = [...this.card];
    n[idx].amount = amount;
    this.card = n;
  }

  deleteItem(item: CardItemDto) {
    let idx = this.card.indexOf(item);
    if (idx === -1) {
      return;
    }
    this.card.splice(idx, 1);
  }

  async addOrder(mean: number, point: number, lat: number, lon: number) {
    await stores.api.user.addOrder({
      mean,
      point,
      lat,
      lon,
      count: this.card.length,
    });
    runInAction(() => (this.card = []));
    this.load();
  }
}

export default OrderStore;
