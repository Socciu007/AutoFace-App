import { Promise } from 'bluebird';
const API_TIMEOUT = 30000;

export const dbSetLocally = (key, value) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-set-db', { key, value });
      window.electron.ipcRenderer.once('ipc-set-db', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const dbGetLocally = (key) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-get-db', { key });
      window.electron.ipcRenderer.once('ipc-get-db' + key, resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const login = (username, password) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-login', { username, password });
      window.electron.ipcRenderer.once('ipc-login', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const getMe = () =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-get-me');
      window.electron.ipcRenderer.once('ipc-get-me', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const getProfilesMarco = () =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-get-profiles');
      window.electron.ipcRenderer.once('ipc-get-profiles', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const getBrowserData = (id) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-get-browser-data', { id });
      window.electron.ipcRenderer.once('ipc-get-browser-data', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const deleteProfile = (id) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-delete-profile', { id });
      window.electron.ipcRenderer.once('ipc-delete-profile', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const createProfile = (name, proxy) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-create-profile', { name, proxy });
      window.electron.ipcRenderer.once('ipc-create-profile', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const updateProfile = (id, proxy) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-update-profile', { id, proxy });
      window.electron.ipcRenderer.once('ipc-update-profile', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });

export const runProfile = (id, code) =>
  new Promise((resolve) => {
    try {
      window.electron.ipcRenderer.sendMessage('ipc-run-profile', { id, code });
      window.electron.ipcRenderer.once('ipc-run-profile', resolve);
      setTimeout(() => {
        resolve({ success: false, error: 'Timeout!' });
      }, API_TIMEOUT);
    } catch (error) {
      resolve({ success: false, error });
    }
  });
