import moment from 'moment';

export const getRemainingTime = comparedDateMoment => {
  const currentDateMoment = moment();
  const duration = moment.duration(
    comparedDateMoment?.diff?.(currentDateMoment, 'seconds'),
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

  return formattedDuration || (seconds ? `${seconds}с` : '');
};
