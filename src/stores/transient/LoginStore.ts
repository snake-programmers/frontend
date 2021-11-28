import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {notLoaded, wrapPromise} from '../../utils';
import stores from '../index';

class LoginStore {
  login: string = '';
  password: string = '';
  state: AsyncState<void> = notLoaded();

  constructor() {
    makeAutoObservable(this, {
      login: observable,
      password: observable,
      state: observable,
      setLogin: action.bound,
      setPassword: action.bound,
      makeLogin: action.bound,
    });
  }

  setLogin(login: string) {
    this.login = login;
  }

  setPassword(password: string) {
    this.password = password;
  }

  makeLogin(): void {
    void wrapPromise(
      stores.auth.login(this.login, this.password),
      this.state,
      (v) => runInAction(() => (this.state = v)),
    );
  }

  resetStatus(): void {
    this.state = notLoaded();
  }
}

export default LoginStore;
