import axios from 'axios';

export const apiBaseUrl = 'https://api.deezer.com/';
const CORSProxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseURL = CORSProxyUrl + apiBaseUrl;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export interface FetchedInstance<T> {
  data: T[];
  total: number;
}

export const createApiAction = (name = '') => {
  const prefix = name.split('/').join(' / ');

  return {
    REQUEST: `${prefix} / REQUEST`,
    SUCCESS: `${prefix} / SUCCESS`,
    FAIL: `${prefix} / FAIL`,
  };
};
