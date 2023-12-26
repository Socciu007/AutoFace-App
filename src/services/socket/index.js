import { io } from 'socket.io-client';
import Promise from 'bluebird';
import { apiGetPortSocket } from '../api_helper';

let socket;
let data = {};
let connecting = false;
const connect = async () => {
  try {
    return await apiGetPortSocket();
  } catch {
    return null;
  }
};

const delay = async (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const connectSocket = async () => {
  if ((!socket || !socket.connected) && !connecting) {
    connecting = true;
    const dataConnect = await connect();
    if (dataConnect && dataConnect.success) {
      socket = io('http://127.0.0.1:' + dataConnect.data.data);
      setTimeout(() => {
        connecting = false;
      }, 1000);
      socket.on('localstorage_result', (response) => {
        if (response && response.key) {
          data[response.key] = response.data;
        }
      });
      await delay(500);
      return true;
    }
    return false;
  }
  return false;
};

export const setDB = async (key, data) => {
  if (socket && socket.connected) {
    socket.emit('localstorage_set', { key, data });
    return true;
  } else {
    console.log('Connect Socket fail');
    return false;
  }
};

export const getDB = async (key) => {
  if (socket && socket.connected) {
    data[key] = null;
    socket.emit('localstorage_get', { key });
    for (let i = 0; i < 100; i++) {
      if (data[key]) {
        return data[key];
      }
      await delay(10);
    }
    return null;
  } else {
    console.log('Connect Socket fail');
    return null;
  }
};
