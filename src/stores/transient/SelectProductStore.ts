import {NearestProductDto, ProductTypeDto} from '../../api/src';
import {notLoaded, wrapPromise} from '../../utils';
import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import stores from '../index';

function formatDistance(distance: number): string {
  if (distance < 1000) {
    return distance.toFixed(1) + 'м. от вас';
  } else {
    return (distance / 1000).toFixed(1) + 'км. от вас';
  }
}

class SelectProductStore {
  data: AsyncState<NearestProductDto[]> = notLoaded();
  selectedKey: number = 0;
  count: {value: string; error?: boolean; parsed: number} = {
    value: '1',
    parsed: 1,
  };

  constructor(readonly type: ProductTypeDto) {
    makeAutoObservable(this, {
      data: observable,
      selectedKey: observable,
      count: observable,
      selectData: computed,
      select: action.bound,
      setCount: action.bound,
    });
    runInAction(() => {
      void wrapPromise(
        stores.api.user.nearestProducts({type: this.type.id}),
        this.data,
        (v) =>
          runInAction(() => {
            this.data = v;
            if (v.status === 'success') {
              this.selectedKey = v.result[0].productId;
            }
          }),
      );
    });
  }

  get selectData(): {
    value: unknown;
    key: number;
    text: string;
    description: string;
  }[] {
    if (this.data.status === 'success') {
      return this.data.result.map((value) => ({
        value,
        key: value.productId,
        text: value.storeName,
        description: `${value.price / 100} ₽/${
          this.type.humanVolume
        } — ${formatDistance(value.distance)}`,
      }));
    } else {
      return [];
    }
  }

  select(dto: unknown): void {
    this.selectedKey = (dto as NearestProductDto).productId;
  }

  setCount(count: string): void {
    try {
      const parsed = parseFloat(count);
      if (isNaN(parsed)) {
        this.count = {value: count, error: true, parsed: this.count.parsed};
        return;
      }
      this.count = {value: count, parsed: parsed};
    } catch (e) {
      this.count = {value: count, error: true, parsed: this.count.parsed};
    }
  }

  add(): void {
    if (this.data.status !== 'success') {
      return;
    }
    stores.order.addToCard({
      type: this.type,
      product: this.data.result.find(
        (value) => value.productId === this.selectedKey,
      )!,
      amount: this.count.parsed,
      id: 1,
    });
  }
}

export default SelectProductStore;
