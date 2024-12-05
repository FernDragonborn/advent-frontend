import { getQueryKey } from '@/utils';

export const QUERY_KEYS = {
  auth: {
    profile: ['profile'],
    allTasks: ['all-tasks'],
    tasksResponses: ['tasks-responses'],
    getTaskById: taskId => ['task', taskId],
    loginGoogle: ['login-google'],
  },
};
