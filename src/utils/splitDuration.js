import moment from 'moment';

export const splitDuration = startDate => {
  const currentDateMoment = moment();
  const startDateMoment = moment(startDate, 'YYYY-MM-DD HH:mm');

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
