'use client';

import { useLayoutEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

import { Loader } from '@/components';
import { DAY_STATUS, QUERY_KEYS } from '@/constants';
import { getCurrentUkraineTime, getTaskStatus } from '@/utils';
import { useAuthQuery } from '@/hooks';
import { api } from '@/services';
import styles from '@/styles/pages/CalendarPage.module.scss';

export default function Page() {
  const [currentTime, setCurrentTime] = useState(null);

  const tasksQuery = useAuthQuery({
    queryKey: QUERY_KEYS.auth.allTasks,
    queryFn: api.auth.getAllTasks,
  });
  const taskResponsesQuery = useAuthQuery({
    queryKey: QUERY_KEYS.auth.tasksResponses,
    queryFn: () => api.auth.getTaskResponses(),
  });

  const tasks = useMemo(() => {
    const allTasks = Array.from(Array(25).keys()).map(val => ({
      taskNumber: val + 6,
    }));
    tasksQuery.data?.forEach?.(
      (task, index) => (allTasks[index] = { ...allTasks[index], ...task }),
    );
    return allTasks;
  }, [tasksQuery.data]);

  const isTaskCompleted = taskId =>
    !!taskResponsesQuery.data?.find?.(({ task }) => task === taskId);

  useLayoutEffect(() => {
    setCurrentTime(getCurrentUkraineTime());
  }, []);

  return (
    <div className={styles.wrapper}>
      {tasksQuery.isLoading && (
        <Loader
          className={clsx(styles.loader, 'absolute-fill')}
          size="large"
          color="var(--color-bg-primary)"
        />
      )}
      <h1 className={styles.title}>{currentTime?.format?.('D MMMM')}</h1>
      <ul className={styles.days}>
        {tasks.map(({ id, taskNumber, due_date }) => {
          const status = getTaskStatus(due_date, isTaskCompleted(id));
          const isActive = status === DAY_STATUS.ACTIVE;

          return (
            <li
              key={taskNumber}
              className={clsx(
                styles.day,
                status === DAY_STATUS.ACTIVE && styles.active,
                !isActive && styles.disabled,
              )}>
              <Link href={!isActive || !id ? '' : `/calendar/days/${id}`}>
                <Image
                  src={`/images/days/${status}/day-${taskNumber - 5}-${status}.png`}
                  width={155}
                  height={155}
                  alt={'День ' + taskNumber}
                  quality={100}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
