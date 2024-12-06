'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import momentTz from 'moment-timezone';
import moment from 'moment';
import clsx from 'clsx';

import {
  Button,
  CalendarBackButton,
  Loader,
  TaskDescriptionCard,
  TaskNarrativeCard,
  TaskResultCard,
} from '@/components';
import {
  useAuthMutation,
  useAuthQuery,
  useFetchProfile,
  useIsMobileVersion,
} from '@/hooks';
import { api } from '@/services';
import { getTaskStatus, isAnswerCorrect } from '@/utils';
import { DAY_STATUS, introductoryWord, QUERY_KEYS } from '@/constants';
import styles from '@/styles/pages/DayPage.module.scss';

const TASK_STEP = {
  INTRO: 'intro',
  NARRATIVE: 'narrative',
  DESCRIPTION: 'description',
  FINAL: 'final',
};

const CONTENT_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
};

export default function Page() {
  const [taskStep, setTaskStep] = useState(TASK_STEP.NARRATIVE);

  const shouldInvalidateTasksResponsesRef = useRef(false);
  const { dayId } = useParams();
  const router = useRouter();
  const { isMobileVersion, isVersionChecked } = useIsMobileVersion();
  const { control, handleSubmit, setError } = useForm();
  const queryClient = useQueryClient();

  const profileQuery = useFetchProfile();
  const taskQuery = useAuthQuery({
    queryKey: QUERY_KEYS.auth.getTaskById(dayId),
    queryFn: () => api.auth.getTaskById(dayId),
  });

  const taskResponsesQuery = useAuthQuery({
    queryKey: QUERY_KEYS.auth.tasksResponses,
    queryFn: () => api.auth.getTaskResponses(),
  });

  const taskResponsesMutation = useAuthMutation(
    {
      mutationFn: api.auth.addTaskResponses,
      onSuccess: () => {
        setTaskStep(TASK_STEP.FINAL);
        shouldInvalidateTasksResponsesRef.current = true;
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.auth.allTasks,
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.auth.profile,
        });
      },
      onError: () => toast('Щось пішло не так :(', { type: 'error' }),
    },
    false,
  );

  const {
    id,
    due_date,
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

  const dayNumber = due_date ? moment(due_date).date() : '';

  // redirect
  useLayoutEffect(() => {
    if (
      due_date &&
      getTaskStatus(due_date, isDayCompleted) !== DAY_STATUS.ACTIVE
    ) {
      router.replace('/calendar');
    }
  }, [due_date, isDayCompleted]);

  useLayoutEffect(() => {
    if (dayNumber === 6) {
      setTaskStep(TASK_STEP.INTRO);
    }
  }, [dayNumber]);

  useEffect(() => {
    return () =>
      shouldInvalidateTasksResponsesRef.current &&
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.auth.tasksResponses,
      });
  }, []);

  const onSubmit = () => {
    if (taskStep === TASK_STEP.DESCRIPTION) {
      const defaultParams = {
        task: id,
        user: profileQuery.data?.id,
        is_correct: true,
      };

      if (!answersNumber) {
        return handleSubmit(({ answer_1 }) => {
          if (answer_1) {
            taskResponsesMutation.mutate({
              ...defaultParams,
              recorded_answer: answer_1,
            });
          } else {
            toast('Поле не може бути порожнім', { type: 'error' });
            setError('answer_1');
          }
        })();
      }

      const { correct_answer_1, correct_answer_2, correct_answer_3 } =
        taskQuery.data || {};

      handleSubmit(data => {
        let hasError = false;
        const { answer_1, answer_2, answer_3 } = data || {};

        if (!isAnswerCorrect(correct_answer_1, answer_1)) {
          hasError = true;
          setError('answer_1');
        }
        if (!isAnswerCorrect(correct_answer_2, answer_2)) {
          hasError = true;
          setError('answer_2');
        }
        if (!isAnswerCorrect(correct_answer_3, answer_3)) {
          hasError = true;
          setError('answer_3');
        }

        if (hasError) {
          toast(fail_text, { type: 'error' });
        } else {
          toast('Вірно!', { type: 'success' });
          taskResponsesMutation.mutate({
            ...defaultParams,
            recorded_answer: [answer_1, answer_2, answer_3]
              .filter(val => val)
              .join(';'),
          });
        }
      })();
    } else if (taskStep === TASK_STEP.FINAL) {
      router.replace('/calendar');
    } else if (taskStep === TASK_STEP.INTRO) {
      setTaskStep(TASK_STEP.NARRATIVE);
    } else {
      setTaskStep(TASK_STEP.DESCRIPTION);
    }
  };

  const onBack = () => {
    if (
      (taskStep === TASK_STEP.NARRATIVE && dayNumber !== 6) ||
      taskStep === TASK_STEP.INTRO
    ) {
      router.replace('/calendar');
    } else if (taskStep === TASK_STEP.NARRATIVE) {
      setTaskStep(TASK_STEP.INTRO);
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
      video_link,
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

    const data = [];
    video_link &&
      video_link !== '-' &&
      data.push({ type: CONTENT_TYPE.VIDEO, src: video_link });
    images.forEach(imgSrc =>
      data.push({ type: CONTENT_TYPE.IMAGE, src: imgSrc }),
    );

    return data;
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
        <h1 className={styles.title}>{momentTz(due_date).format('D MMMM')}</h1>
      </div>

      <div>
        {taskStep === TASK_STEP.INTRO && (
          <TaskNarrativeCard
            imgSrc={intro_image || ''}
            data={introductoryWord}
          />
        )}
        {taskStep === TASK_STEP.NARRATIVE && (
          <TaskNarrativeCard imgSrc={intro_image || ''} text={intro_text} />
        )}
        {taskStep === TASK_STEP.DESCRIPTION && (
          <TaskDescriptionCard
            data={taskImages}
            answersNumber={answersNumber}
            isMobileVersion={isMobileVersion}
            formControl={control}
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
          isLoading={taskResponsesMutation.isPending}
          onClick={onSubmit}>
          {taskStep === TASK_STEP.DESCRIPTION ? 'Надіслати' : 'Продовжити'}
        </Button>
      </div>
    </div>
  );
}
