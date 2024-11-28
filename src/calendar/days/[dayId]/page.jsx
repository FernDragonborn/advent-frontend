'use client';

import { useParams } from 'next/navigation';

import { Button, TaskNarrativeCard } from '@/components';
import styles from '@/styles/pages/DayPage.module.scss';

export default function Page() {
  const { dayId } = useParams();

  return (
    <div className={styles.wrapper}>
      <TaskNarrativeCard imgSrc={'/images/artifacts/artifact-default.png'} />

      <Button
        className={styles.submitBtn}
        appearance="orange"
        onClick={() => null}>
        Продовжити
      </Button>
    </div>
  );
}
