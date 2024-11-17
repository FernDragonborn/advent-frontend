import axios from 'axios';

import { COOKIES } from '@/constants';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  config => {
    const clientCookies = require('cookies-next');
    const accessToken = clientCookies.getCookie(COOKIES.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response.data;
  },

  error => {
    const { status, data } = error?.response || {};
    return Promise.reject({ status, data });
  },
);
