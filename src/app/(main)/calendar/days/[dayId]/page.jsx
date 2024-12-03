'use client';

import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';

import {
  Button,
  CalendarBackButton,
  TaskDescriptionCard,
  TaskNarrativeCard,
  TaskResultCard,
} from '@/components';
import styles from '@/styles/pages/DayPage.module.scss';

const TASK_TYPE = {
  DEFAULT: 'default',
  OPEN_QUESTION: 'open-question',
  MULTI_ANSWERS: 'multi-answers',
};

export default function Page() {
  const { dayId } = useParams();

  // useEffect(() => {
  //   toast('Ой, не зовсім те, але ти на правильному шляху! Спробуй ще раз!', {
  //     type: 'error',
  //   });
  // }, []);

  return (
    <>
      <div className={styles.block}>
        <CalendarBackButton className={styles.backBtn} />
        <h1 className={styles.title}>День {dayId}</h1>
      </div>

      <div className={styles.wrapper}>
        {/* <TaskNarrativeCard imgSrc={'/images/artifacts/artifact-default.png'} /> */}
        {/* <TaskDescriptionCard
        taskType={TASK_TYPE.MULTI_ANSWERS}
        imagesSrc={[
          '/images/tasks/task-desktop.png',
          '/images/tasks/task-mobile.png',
          '/images/auth/child.jpg',
        ]}
      /> */}
        <TaskResultCard />

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
