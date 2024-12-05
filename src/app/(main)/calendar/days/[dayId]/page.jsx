'use client';

import { useLayoutEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import clsx from 'clsx';

import {
  Button,
  CalendarBackButton,
  Loader,
  TaskDescriptionCard,
  TaskNarrativeCard,
  TaskResultCard,
} from '@/components';
import { useAuthMutation, useAuthQuery, useIsMobileVersion } from '@/hooks';
import { api } from '@/services';
import { getCurrentUkraineTime, getTaskStatus } from '@/utils';
import { DAY_STATUS } from '@/constants';
import styles from '@/styles/pages/DayPage.module.scss';

const TASK_TYPE = {
  DEFAULT: 'default',
  OPEN_QUESTION: 'open-question',
  MULTI_ANSWERS: 'multi-answers',
};

const TASK_STEP = {
  NARRATIVE: 'narrative',
  DESCRIPTION: 'description',
  FINAL: 'final',
};

export default function Page() {
  const [taskStep, setTaskStep] = useState(TASK_STEP.DESCRIPTION);
  const { dayId } = useParams();
  const router = useRouter();
  const { isMobileVersion, isVersionChecked } = useIsMobileVersion();

  const taskQuery = useAuthQuery({
    queryKey: ['task', dayId],
    queryFn: () => api.auth.getTaskById(dayId),
  });

  const taskResponsesQuery = useAuthQuery({
    queryKey: ['task-responses'],
    queryFn: () => api.auth.getTaskResponses(),
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

  const {
    id,
    group,
    due_date,
    unlocks_artifact,
    intro_text,
    pk,
    outro_text,
    fail_text,
    intro_image,
    teleport_image,
    points_award,
  } = taskQuery.data || {};

  const isDayCompleted = useMemo(
    () => !!taskResponsesQuery.data?.find?.(({ task }) => task === id),
    [taskResponsesQuery.data, id],
  );

  // redirect
  useLayoutEffect(() => {
    if (
      due_date &&
      getTaskStatus(due_date, isDayCompleted) !== DAY_STATUS.ACTIVE
    ) {
      router.replace('/calendar');
    }
  }, [due_date, isDayCompleted]);

  const onSubmit = () => {
    if (taskStep === TASK_STEP.DESCRIPTION) {
      setTaskStep(TASK_STEP.FINAL);
    } else if (taskStep === TASK_STEP.FINAL) {
      router.replace('/calendar');
    } else {
      setTaskStep(TASK_STEP.DESCRIPTION);
    }
  };

  const onBack = () => {
    if (taskStep === TASK_STEP.NARRATIVE) {
      router.replace('/calendar');
    } else if (taskStep === TASK_STEP.DESCRIPTION) {
      setTaskStep(TASK_STEP.NARRATIVE);
    } else {
      setTaskStep(TASK_STEP.DESCRIPTION);
    }
  };

  const taskImages = useMemo(() => {
    const {
      task_image_1,
      task_image_2,
      task_image_3,
      task_image_1_mob,
      task_image_2_mob,
      task_image_3_mob,
    } = taskQuery.data || {};
    const images = [];

    if (isMobileVersion) {
      task_image_1_mob && images.push(task_image_1_mob);
      task_image_2_mob && images.push(task_image_2_mob);
      task_image_3_mob && images.push(task_image_3_mob);
    } else {
      task_image_1 && images.push(task_image_1);
      task_image_2 && images.push(task_image_2);
      task_image_3 && images.push(task_image_3);
    }

    return images;
  }, [taskQuery.data, isMobileVersion]);

  const answersNumber = useMemo(() => {
    const { correct_answer_1, correct_answer_2, correct_answer_3 } =
      taskQuery.data || {};
    let number = 0;
    if (correct_answer_1 !== '-') number += 1;
    if (correct_answer_2 !== '-') number += 1;
    if (correct_answer_3 !== '-') number += 1;
    return number;
  }, [taskQuery.data]);

  return (
    <div className={styles.wrapper}>
      {(taskQuery.isLoading || !isVersionChecked) && (
        <Loader
          className={clsx(styles.loader, 'absolute-fill')}
          size="large"
          color="var(--color-bg-primary)"
        />
      )}

      <div className={styles.block}>
        <CalendarBackButton className={styles.backBtn} onClick={onBack} />
        <h1 className={styles.title}>День {dayId}</h1>
      </div>

      <div>
        {taskStep === TASK_STEP.NARRATIVE && (
          <TaskNarrativeCard imgSrc={intro_image} text={intro_text} />
        )}
        {taskStep === TASK_STEP.DESCRIPTION && (
          <TaskDescriptionCard
            taskType={TASK_TYPE.MULTI_ANSWERS}
            imagesSrc={taskImages}
            answersNumber={answersNumber}
            isMobileVersion={isMobileVersion}
          />
        )}
        {taskStep === TASK_STEP.FINAL && (
          <TaskResultCard
            text={outro_text}
            imgSrc={teleport_image || '/images/portals/portal.png'}
          />
        )}

        <Button
          className={styles.submitBtn}
          appearance="orange"
          onClick={onSubmit}>
          {taskStep === TASK_STEP.DESCRIPTION ? 'Надіслати' : 'Продовжити'}
        </Button>
      </div>
    </div>
  );
}
