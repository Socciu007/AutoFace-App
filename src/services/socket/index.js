import { io } from 'socket.io-client';
import Promise from 'bluebird';
import { apiGetPortSocket } from '../api_helper';
import { APP_ID } from '../../common/const.api';

let socket;
let port;
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
    if (!port) {
      const dataConnect = await connect();
      if (dataConnect && dataConnect.success) {
        port = dataConnect.data.data;
      }
    }
    if (port) {
      socket = io('http://127.0.0.1:' + port);
      socket.on('localstorage_result', (response) => {
        if (response && response.key) {
          data[response.key] = response.data;
        }
      });
      socket.on('exec_result', (response) => {
        console.log('exec_result');
        console.log(response);

        if (response.action === 'start') {
          console.log('');
        }
      });
      await delay(500);
      connecting = false;
      return true;
    }
    return false;
  }
  return false;
};

export const exec = async (code, data, action = '') => {
  if (!socket) return false;
  socket.emit('exec', {
    ...data,
    action,
    sourceCode: code,
  });
};

export const stop = async () => {
  if (!this.socket) return;
  this.socket.emit('exec', {
    action: 'stop',
    sourceCode: `
      const keys = Object.keys(global.appws['${APP_ID}'].browsers);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (global.appws['${APP_ID}'].browsers[key]) {
          global.appws['${APP_ID}'].browsers[key].close().then()
          delete global.appws['${APP_ID}'].browsers[key]
        }
      }
      
      return true
    `,
  });
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
