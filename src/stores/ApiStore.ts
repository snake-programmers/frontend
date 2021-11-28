import {SuggestApi, Configuration, UserApi, RegisterApi} from '../api/src';

let configuration = new Configuration({
  basePath: 'http://192.168.63.226:8080',
});

class ApiStore {
  suggest = new SuggestApi(configuration);
  user = new UserApi(configuration);
  register = new RegisterApi(configuration);

  setAuth(login: string, password: string) {
    const config = new Configuration({
      basePath: 'http://192.168.63.226:8080',
      username: login,
      password: password,
    });
    this.user = new UserApi(config);
  }
}

export default ApiStore;
