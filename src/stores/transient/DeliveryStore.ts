import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import {AddressDto, DeliveryRoutingDto} from '../../api/src';
import stores from '../index';
import {mapValues, notLoaded, wrapPromise} from '../../utils';

function formatDistance(distance: number): string {
  if (distance < 1000) {
    return distance.toFixed(1) + 'м.';
  } else {
    return (distance / 1000).toFixed(1) + 'км.';
  }
}

function deliveryTime(distance: number, type: string): string {
  let timeHs = distance / 1000 / 30;
  if (type == 'Курьером пешком') {
    timeHs = distance / 1000 / 10;
  } else if (type === 'На машине') {
    timeHs = distance / 1000 / 50;
  }
  if (timeHs < 1) {
    return (timeHs * 60).toFixed(0) + ' мин.';
  } else {
    return Math.ceil(timeHs).toFixed(0) + ' ч.';
  }
}

function calcHours(distance: number, type: string) {
  let timeHs = distance / 1000 / 30;
  if (type == 'Курьером пешком') {
    timeHs = distance / 1000 / 10;
  } else if (type === 'На машине') {
    timeHs = distance / 1000 / 50;
  }
  return timeHs;
}

function calcPrice(distance: number, type: string, perKm: number) {
  let timeHs = calcHours(distance, type);
  return ((timeHs * perKm) / 100).toFixed(0) + ' ₽';
}

class DeliveryStore {
  address: AddressDto = {
    name: stores.auth.info!.homeAddress,
    lat: stores.auth.info!.lat,
    lon: stores.auth.info!.lon,
  };
  data: AsyncState<DeliveryRoutingDto[]> = notLoaded();
  selected: number = 0;

  constructor() {
    makeAutoObservable(this, {
      address: observable,
      selected: observable,
      total: computed,
      procData: computed,
      setAddress: action.bound,
      onSelect: action.bound,
    });
    this.loadData();
  }

  get procData(): AsyncState<
    {key: number; value: unknown; text: string; description: string}[]
  > {
    return mapValues(this.data, (v) => {
      return v.map((value) => ({
        key: value.meanId,
        value: value,
        text: `${value.service} - ${value.mean}`,
        description: `${formatDistance(value.distance)} - ${deliveryTime(
          value.distance,
          value.mean,
        )} - ${calcPrice(value.distance, value.mean, value.pricePerKm)}`,
      }));
    });
  }

  get total(): string {
    if (this.data.status !== 'success') {
      return '--';
    }
    let cardSum = 0;
    if (stores.order.card.length > 0) {
      cardSum = stores.order.card
        .map((value) => value.product.price * value.amount)
        .reduce((a, b) => a + b);
    }
    const delivery = this.data.result.find(
      (value) => value.meanId === this.selected,
    )!;
    const delCosts =
      calcHours(delivery.distance, delivery.mean) * delivery.pricePerKm;
    return ((cardSum + delCosts) / 100).toFixed(0) + ' ₽';
  }

  onSelect(value: unknown) {
    this.selected = (value as DeliveryRoutingDto).meanId;
  }

  setAddress(addr: AddressDto) {
    this.address = addr;
    this.loadData();
  }

  loadData() {
    wrapPromise(
      stores.api.user.route({
        routeParamsDto: {
          lat: this.address.lat,
          lon: this.address.lon,
          stores: stores.order.card.map((value) => value.product.storeId),
        },
      }),
      this.data,
      (v) =>
        runInAction(() => {
          if (v.status === 'success' && v.result.length > 0) {
            this.selected = v.result[0].meanId;
          }
          return (this.data = v);
        }),
    );
  }

  async addOrder() {
    if (this.data.status !== 'success') {
      return;
    }
    const delivery = this.data.result.find(
      (value) => value.meanId === this.selected,
    )!;
    await stores.order.addOrder(
      delivery.meanId,
      delivery.pointId!,
      this.address.lat,
      this.address.lon,
    );
  }
}

export default DeliveryStore;
