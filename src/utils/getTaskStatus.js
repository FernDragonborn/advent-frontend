import momentTz from 'moment-timezone';

import { DAY_STATUS } from '@/constants';
import { getCurrentUkraineTime } from '@/utils';

export const getTaskStatus = (dueDate, isTaskCompleted) => {
  const localDate = momentTz.tz(dueDate, 'YYYY-MM-DD', 'Europe/Kyiv');
  const currentLocalDate = getCurrentUkraineTime();
  // const currentLocalDate = momentTz('2024-12-10T00:00:00Z');

  if (isTaskCompleted) {
    return DAY_STATUS.COMPLETED;
  }
  if (currentLocalDate.diff(localDate, 'days') >= 3) {
    return DAY_STATUS.FAILED;
  }
  if (
    localDate.isSame(currentLocalDate, 'day') ||
    (currentLocalDate.diff(localDate, 'days') < 3 &&
      currentLocalDate.diff(localDate, 'days') > 0)
  ) {
    return DAY_STATUS.ACTIVE;
  }
  return DAY_STATUS.UPCOMING;
};
