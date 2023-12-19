import axios from 'axios';
import storageService from './storage.service';
import { accessToken } from '../common/const.config';
import { URL_API } from '../common/const.api';

const loadings = [];

class HttpService {
  async get(path, options = { headers: {}, params: {}, body: {} }) {
    return await this.request('GET', path, options);
  }

  async post(path, options = { headers: {}, params: {}, body: {}, auth: {} }) {
    return await this.request('POST', path, options);
  }

  async patch(path, options = { headers: {}, params: {}, body: {} }) {
    return await this.request('PATCH', path, options);
  }

  async put(path, options = { headers: {}, params: {}, body: {} }) {
    return await this.request('PUT', path, options);
  }

  async delete(path, options = { headers: {}, params: {}, body: {} }) {
    return await this.request('DELETE', path, options);
  }

  removeItem(path) {
    let i = 0;
    while (i < loadings.length) {
      if (loadings[i] === path) {
        loadings.splice(i, 1);
      } else {
        ++i;
      }
    }
  }

  async request(method, path, options = { headers: {}, params: {}, body: {} }) {
    if (method == 'GET' && loadings.includes(path))
      return {
        success: false,
        data: undefined,
        errors: undefined,
      };
    loadings.push(path);
    const url = `${URL_API}${path}`;
    const headers = this.generateHttpHeaders(options.headers);
    const res = await axios
      .request({
        method: method,
        url: url,
        headers: headers,
        params: options.params,
        data: options.body,
        auth: options.auth,
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          if (error.response.status == 401) {
            //Hết hạn token cần logout ra màn hình đăng nhập
            return error.response.data;
          } else {
            return error.response.data;
          }
        }
        return {
          success: false,
          data: undefined,
          errors: "Can't connect to server!",
        };
      });
    this.removeItem(path);

    if (res && (res.status == 200 || res.status == 201)) {
      return {
        success: true,
        data: res.data,
        errors: undefined,
      };
    } else {
      return res;
    }
  }

  generateHttpHeaders(headerInfo) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storageService.get(accessToken)}`,
    };

    if (headerInfo) {
      for (const item of Object.keys(headerInfo)) {
        headers[item] = headerInfo[item];
      }
    }

    return headers;
  }
}

export default HttpService;
