import momentTz from 'moment-timezone';
import 'moment/locale/uk'; // Імпортуємо українську локаль

export const getCurrentUkraineTime = () =>
  momentTz().tz('Europe/Kyiv').locale('uk');
