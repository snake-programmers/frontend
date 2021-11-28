import {action, makeAutoObservable, observable, runInAction} from 'mobx';
import {AddressDto} from '../../api/src';
import {notLoaded, wrapPromise} from '../../utils';
import stores from '../index';

class RegisterStore {
  email: string = '';
  password: string = '';
  name: string = '';
  address: string = '';
  lat: number = 0;
  lon: number = 0;
  state: AsyncState<void> = notLoaded();

  constructor() {
    makeAutoObservable(this, {
      email: observable,
      password: observable,
      name: observable,
      address: observable,
      lat: observable,
      lon: observable,
      state: observable,
      setEmail: action.bound,
      setPassword: action.bound,
      setName: action.bound,
      setAddress: action.bound,
      register: action.bound,
      clearRegistrationState: action.bound,
    });
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setName(name: string) {
    this.name = name;
  }

  setAddress(address: AddressDto) {
    this.address = address.name;
    this.lat = address.lat;
    this.lon = address.lon;
  }

  register() {
    wrapPromise(
      (async () => {
        await stores.api.register.register({
          email: this.email,
          lat: this.lat,
          lon: this.lon,
          address: this.address,
          password: this.password,
          name: this.name,
        });
        await stores.auth.login(this.email, this.password);
      })(),
      this.state,
      (v) => runInAction(() => (this.state = v)),
    );
  }

  clearRegistrationState() {
    this.state = notLoaded();
  }
}

export default RegisterStore;
