import ApiStore from './ApiStore';
import OrderStore from './OrderStore';
import AuthStore from './AuthStore';

export interface Stores {
  api: ApiStore;
  order: OrderStore;
  auth: AuthStore;
}

const stores: Stores = {
  api: new ApiStore(),
  order: new OrderStore(),
  auth: new AuthStore(),
};

export default stores;
