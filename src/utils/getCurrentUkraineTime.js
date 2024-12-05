import momentTz from 'moment-timezone';

export const getCurrentUkraineTime = () => momentTz().tz('Europe/Kyiv');
