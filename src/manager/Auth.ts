import EncryptedStorage from 'react-native-encrypted-storage';

class Auth {
  static async storeAuth(login: string, password: string) {
    await EncryptedStorage.setItem('authLogin', login);
    await EncryptedStorage.setItem('authPassword', password);
  }

  static async getAuth(): Promise<
    {login: string; password: string} | undefined
  > {
    const login = await EncryptedStorage.getItem('authLogin');
    const password = await EncryptedStorage.getItem('authPassword');
    if (!login || !password) {
      return undefined;
    }
    return {login, password};
  }
}

export default Auth;
