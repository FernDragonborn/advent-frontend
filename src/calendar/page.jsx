'use client';

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import clsx from 'clsx';

import { DAY_STATUS, EVENT_END_DATE, EVENT_START_DATE } from '@/constants';
import styles from '@/styles/pages/CalendarPage.module.scss';

export default function Page() {
  const [currentMoment, setCurrentMoment] = useState(moment());

  useLayoutEffect(() => {
    setCurrentMoment(moment());
  }, []);

  return (
    <>
      <ul className={styles.days}>
        {Array.from(Array(25).keys()).map((val, index) => {
          const disabled = false;
          // currentMoment.isBefore(moment(EVENT_START_DATE).utc(true)) ||
          //   currentMoment.isAfter(moment(EVENT_END_DATE).utc(true));
          const status = currentMoment.isBefore(
            moment(EVENT_START_DATE).utc(true),
          )
            ? DAY_STATUS.UPCOMING
            : DAY_STATUS.ACTIVE;
          const dayNumber = index + 1;

          return (
            <li
              key={val}
              className={clsx(styles.day, disabled && styles.disabled)}>
              <Link href={disabled ? '' : `/calendar/days/${index}`}>
                <Image
                  src={`/images/days/${status}/day-${dayNumber}-${status}.png`}
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
