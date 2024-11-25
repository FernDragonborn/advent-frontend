import { apiClient } from './apiClient';

const apiAuth = {
  register: payload => apiClient.post('auth/user', payload),

  changePassword: payload => apiClient.put('auth/change-password', payload),
  passwordReset: payload => apiClient.post('auth/password-reset', payload),
  passwordResetComplete: payload =>
    apiClient.post('auth/password-reset-complete', payload),
  passwordResetConfirm: () => apiClient.get('auth/password-reset-confirm'),

  getUser: () => apiClient.get('auth/user'),
  addUser: payload => apiClient.put('auth/user', payload),
  updateUser: payload => apiClient.patch('auth/user', payload),
};

export default apiAuth;
