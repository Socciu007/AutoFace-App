import HttpService from './http-service';
import { FOLDERS, PROFILES, PROXIES } from '../common/const.api';

const http = new HttpService();

export const apiGetProfiles = async () => {
  return await http.get(PROFILES);
};
export const apiGetFolder = async () => {
  return await http.get(FOLDERS);
};
export const apiGetProxies = async () => {
  return await http.get(PROXIES);
};
