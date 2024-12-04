'use client';

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import clsx from 'clsx';

import { DAY_STATUS, EVENT_END_DATE, EVENT_START_DATE } from '@/constants';
import { getCurrentUkraineTime } from '@/utils';
import styles from '@/styles/pages/CalendarPage.module.scss';

export default function Page() {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentMoment, setCurrentMoment] = useState(null);

  useLayoutEffect(() => {
    const newMoment = getCurrentUkraineTime();

    setCurrentMoment(newMoment);
    setCurrentDay(newMoment.get('date'));
  }, []);

  const getDayStatus = (status, dayNumber) => {
    if (currentMoment?.isBefore?.(moment(EVENT_START_DATE).utc(true))) {
      return DAY_STATUS.UPCOMING;
    }
    if (currentMoment?.isAfter?.(moment(EVENT_END_DATE).utc(true))) {
      return DAY_STATUS.UPCOMING;
    }
  };

  return (
    <>
      <h1 className={styles.title}>День {currentDay}</h1>
      <ul className={styles.days}>
        {Array.from(Array(25).keys()).map(val => {
          const disabled = false;
          const dayNumber = val + 6;
          const status = currentMoment?.isBefore?.(
            moment(EVENT_START_DATE).utc(true),
          )
            ? DAY_STATUS.UPCOMING
            : DAY_STATUS.ACTIVE;

          return (
            <li
              key={val}
              className={clsx(
                styles.day,
                status === DAY_STATUS.ACTIVE && styles.active,
                disabled && styles.disabled,
              )}>
              <Link href={disabled ? '' : `/calendar/days/${dayNumber}`}>
                <Image
                  src={`/images/days/${status}/day-${dayNumber - 5}-${status}.png`}
                  width={155}
                  height={155}
                  alt={'День ' + dayNumber}
                  quality={100}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
