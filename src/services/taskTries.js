import moment from 'moment';

import { localStorageService } from '@/services';

const getTries = () => {
  const savedTries = localStorageService.getData('task-tries');

  return Array.isArray(savedTries) ? savedTries : [];
};

const record = taskId => {
  const allTries = getTries();
  const recordedTryIndex = allTries.findIndex(data => data?.taskId === taskId);
  const newTry = { taskId, date: new Date() };

  if (recordedTryIndex > -1) {
    allTries[recordedTryIndex] = newTry;
  } else {
    allTries.push(newTry);
  }

  localStorageService.saveData('task-tries', allTries);
};

const isTaskAccessible = taskId => {
  const allTries = getTries();
  const recordedTry = allTries.find(data => data?.taskId === taskId);

  if (!recordedTry || !recordedTry?.date) {
    return true;
  }

  return moment().isAfter(moment(recordedTry?.date).add(1, 'minutes'));
};

export const taskTries = {
  record,
  isTaskAccessible,
};
