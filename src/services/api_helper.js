// import HttpService from './http-service';
// import { APP_ID, AUTO_CONNECT, FOLDERS, PROFILES, PROXIES, START_PROFILE, STOP_PROFILE } from '../common/const.api';

// const http = new HttpService();

// export const apiGetProfiles = async () => {
//   return await http.get(PROFILES);
// };

// export const apiStartProfiles = async (id, body = {}) => {
//   return await http.post(`${START_PROFILE}${id}`, { body });
// };

// export const apiStopProfiles = async (id) => {
//   return await http.post(`${STOP_PROFILE}${id}`);
// };

// export const apiGetFolder = async () => {
//   return await http.get(FOLDERS);
// };

// export const apiUpdateProfiles = async (id, proxy, browserSource) => {
//   const body = { proxy: JSON.stringify(proxy), browserSource };
//   return await http.put(`${PROFILES}/${id}`, { body });
// };

// export const apiGetProxies = async () => {
//   return await http.get(PROXIES);
// };

// export const apiGetPortSocket = async () => {
//   return await http.post(`${AUTO_CONNECT}${APP_ID}`);
// };
