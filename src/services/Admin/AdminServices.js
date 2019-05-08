import BaseServices from '../baseService';
import config from '../config';

class AdminServices extends BaseServices {
  fetchData(opts = {}) {
    const getApi = 'api2';
    this.endpoint = '/api/data';
    return this.get(opts, getApi);
  }

  importExcel(payload) {
    const option = {
      'Content-type': 'multipart/form-data',
    };
    const getAPi = 'api2';
    this.endpoint = '/import';
    return this.post(getAPi, payload, option);
  }
}

export default new AdminServices();
