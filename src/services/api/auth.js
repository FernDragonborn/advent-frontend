import { apiClient } from './apiClient';

const apiAuth = {
  register: payload => apiClient.post('auth/register/', payload),
  login: payload =>
    apiClient.post('auth/token/', new URLSearchParams(payload).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }),
  getGoogleAuthUrl: () => apiClient.get('auth/google-auth-url/'),
  loginGoogle: payload => apiClient.post('auth/google-auth/', payload),
  refreshToken: payload => apiClient.post('auth/token/refresh/', payload),
  verifyEmail: payload => apiClient.post('auth/verify-email/', payload),

  changePassword: payload => apiClient.put('auth/change-password/', payload),
  passwordReset: payload => apiClient.post('auth/password-reset/', payload),
  passwordResetComplete: payload =>
    apiClient.post('auth/password-reset-complete/', payload),
  passwordResetConfirm: params =>
    apiClient.get('auth/password-reset-confirm/', { params }),

  getUser: () => apiClient.get('auth/user/'),
  addUser: payload => apiClient.put('auth/user/', payload),
  updateUser: payload => apiClient.patch('auth/user/', payload),

  getAllTasks: () => apiClient.get('auth/tasks/'),
  getTaskById: taskId => apiClient.get(`auth/tasks/${taskId}`),
  getTaskResponses: () => apiClient.get(`auth/task-responses/`),
  addTaskResponses: payload => apiClient.post(`auth/task-responses/`, payload),
};

export default apiAuth;
