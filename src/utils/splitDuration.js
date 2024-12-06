import moment from 'moment';
import { getCurrentUkraineTime } from '@/utils/getCurrentUkraineTime';

export const splitDuration = (startDate, dateFormat) => {
  const currentDateMoment = getCurrentUkraineTime();
  const startDateMoment = moment(startDate, dateFormat);

  if (currentDateMoment.isAfter(startDate)) {
    return null;
  }

  const duration = moment.duration(
    startDateMoment.diff(currentDateMoment, 'seconds'),
    'seconds',
  );

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return { days, hours, minutes, seconds };
};
