'use client';

import { useParams } from 'next/navigation';

import { Button, TaskDescriptionCard } from '@/components';
import styles from '@/styles/pages/DayPage.module.scss';

export default function Page() {
  const { dayId } = useParams();

  return (
    <div className={styles.wrapper}>
      {/* <TaskNarrativeCard imgSrc={'/images/artifacts/artifact-default.png'} /> */}
      <TaskDescriptionCard imgSrc={'/images/tasks/task-mobile.png'} />

      <Button
        className={styles.submitBtn}
        appearance="orange"
        onClick={() => null}>
        Продовжити
      </Button>
    </div>
  );
}
