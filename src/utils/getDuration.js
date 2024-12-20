import { splitDuration } from '@/utils';

export const getDuration = (startDate, dateFormat) => {
  const { days, hours, minutes, seconds } =
    splitDuration(startDate, dateFormat) || {};

  let formattedDuration = '';

  if (days > 0) formattedDuration += `${days}д `;
  if (hours > 0) formattedDuration += `${hours}г `;
  if (minutes > 0) formattedDuration += `${minutes}хв `;

  formattedDuration.trim();

  return formattedDuration || (seconds ? `${seconds}с` : '');
};
