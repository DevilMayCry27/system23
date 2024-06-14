import { encryptedString, decryptedString } from '../utils/crypt.js';

const storage = sessionStorage;

export const setItem = (key,value) => storage.setItem(key,encryptedString(JSON.stringify(value)));

export const getItem = (key) => storage.getItem(key) && JSON.parse(decryptedString(storage.getItem(key)));

export const deleteStorage = () => storage.clear();
