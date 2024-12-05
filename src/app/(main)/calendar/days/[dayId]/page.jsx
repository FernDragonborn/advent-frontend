'use client';

import { useLayoutEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  Button,
  CalendarBackButton,
  TaskDescriptionCard,
  TaskNarrativeCard,
  TaskResultCard,
} from '@/components';
import { useAuthMutation, useAuthQuery } from '@/hooks';
import styles from '@/styles/pages/DayPage.module.scss';
import { api } from '@/services';

const TASK_TYPE = {
  DEFAULT: 'default',
  OPEN_QUESTION: 'open-question',
  MULTI_ANSWERS: 'multi-answers',
};

export default function Page() {
  const { dayId } = useParams();
  const router = useRouter();

  // useEffect(() => {
  //   toast('Ой, не зовсім те, але ти на правильному шляху! Спробуй ще раз!', {
  //     type: 'error',
  //   });
  // }, []);

  const taskQuery = useAuthQuery({
    queryKey: ['task', dayId],
    queryFn: () => api.auth.getTaskById(dayId),
  });

  const taskResponsesQuery = useAuthQuery({
    queryKey: ['task-responses', dayId],
    queryFn: () => api.auth.getTaskResponses(dayId),
  });

  const taskResponsesMutation = useAuthMutation({
    mutationFn: () => api.auth.addTaskResponses(dayId),
  });
  // {
  //   "task": 0,
  //   "user": 0,
  //   "is_correct": true,
  //   "recorded_answer": "string"
  // }

  useLayoutEffect(() => {
    if (dayId < 6 || dayId > 30) {
      router.replace('/calendar');
    }
  }, [dayId]);

  return (
    <>
      <div className={styles.block}>
        <CalendarBackButton className={styles.backBtn} />
        <h1 className={styles.title}>День {dayId}</h1>
      </div>

      <div className={styles.wrapper}>
        {/* <TaskNarrativeCard imgSrc={'/images/artifacts/artifact-default.png'} /> */}
        <TaskDescriptionCard
          taskType={TASK_TYPE.MULTI_ANSWERS}
          imagesSrc={[
            '/images/tasks/task-desktop.png',
            '/images/tasks/task-mobile.png',
            '/images/auth/child.jpg',
          ]}
        />
        {/* <TaskResultCard /> */}

        <Button
          className={styles.submitBtn}
          appearance="orange"
          onClick={() => null}>
          Продовжити
        </Button>
      </div>
    </>
  );
}
