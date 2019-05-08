import BaseService from './baseService';

const storage = window.localStorage;

class AuthService extends BaseService {
  constructor() {
    super();
  }

  login(email, password) {
    this.endpoint = '/api/login';
    const payload = {
      email,
      password,
    };

    return this.post(payload);
  }

  register(username, email, password, confirmPassword) {
    this.endpoint = '/api/register';
    const payload = {
      name: username,
      email,
      password,
      passwords: confirmPassword,
    };

    return this.post(payload);
  }

  loggedIn() {
    const authToken = storage.getItem('token');
    return typeof authToken === 'string' && authToken.length > 0;
  }
}

export default new AuthService();
