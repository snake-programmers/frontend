import stores from './index';
import Auth from '../manager/Auth';
import {UserDto} from '../api/src';

class AuthStore {
  public info: UserDto | undefined = undefined;

  async login(login: string, password: string): Promise<void> {
    stores.api.setAuth(login, password);
    this.info = await stores.api.user.getUserInfo();
    stores.order.load();
    await Auth.storeAuth(login, password);
  }

  async init(): Promise<boolean> {
    const auth = await Auth.getAuth();
    if (auth) {
      stores.api.setAuth(auth.login, auth.password);
      this.info = await stores.api.user.getUserInfo();
      stores.order.load();
    }
    return !!auth;
  }
}

export default AuthStore;
