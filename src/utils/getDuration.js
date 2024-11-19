import moment from 'moment';

export const getDuration = startDate => {
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

  let formattedDuration = '';

  if (days > 0) formattedDuration += `${days}д `;
  if (hours > 0) formattedDuration += `${hours}г `;
  if (minutes > 0) formattedDuration += `${minutes}хв `;

  formattedDuration.trim();

  return formattedDuration || `${seconds}с`;
};
