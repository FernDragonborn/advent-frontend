import { apiClient } from './apiClient';

const apiAuth = {
  login: payload => apiClient.post('auth/login', payload),
  refreshToken: payload => apiClient.post('auth/renewToken', payload),
};

export default apiAuth;
