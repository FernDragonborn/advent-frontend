'use client';

import { useParams } from 'next/navigation';

import {
  Button,
  TaskDescriptionCard,
  TaskNarrativeCard,
  TaskResultCard,
} from '@/components';
import styles from '@/styles/pages/DayPage.module.scss';

export default function Page() {
  const { dayId } = useParams();

  return (
    <div className={styles.wrapper}>
      <TaskNarrativeCard imgSrc={'/images/artifacts/artifact-default.png'} />
      {/* <TaskDescriptionCard
        imagesSrc={[
          '/images/tasks/task-desktop.png',
          '/images/auth/child.jpg',
          '/images/tasks/task-mobile.png',
        ]}
      /> */}
      {/* <TaskResultCard /> */}

      <Button
        className={styles.submitBtn}
        appearance="orange"
        onClick={() => null}>
        Продовжити
      </Button>
    </div>
  );
}
