'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Controller, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/controller';

import { Loader, TextInputField } from '@/components';
import { useIsMobileVersion } from '@/hooks';
import { ArrowRightSvg } from '@/svgs';
import styles from '@/styles/components/cards/TaskDescriptionCard.module.scss';

const TASK_TYPE = {
  DEFAULT: 'default',
  OPEN_QUESTION: 'open-question',
  MULTI_ANSWERS: 'multi-answers',
};

const TaskDescriptionCard = ({ taskType, imagesSrc }) => {
  const [controlledSwiper, setControlledSwiper] = useState(undefined);
  const swiperRef = useRef(null);
  const { isMobileVersion, isVersionChecked } = useIsMobileVersion();

  const onPressPrevBtn = () => swiperRef.current?.slidePrev?.();
  const onPressNextBtn = () => swiperRef.current?.slideNext?.();

  return (
    <div className={styles.card}>
      {isVersionChecked ? (
        <>
          <div className={styles.images}>
            {(taskType === TASK_TYPE.DEFAULT ||
              taskType === TASK_TYPE.OPEN_QUESTION ||
              (taskType === TASK_TYPE.MULTI_ANSWERS && !isMobileVersion)) && (
              <Image
                className={styles.taskImg}
                src={imagesSrc?.[0]}
                width={1100}
                height={620}
                alt="Завдання"
              />
            )}
            {taskType === TASK_TYPE.MULTI_ANSWERS && isMobileVersion && (
              <Swiper
                ref={swiperRef}
                loop
                spaceBetween={0}
                slidesPerView={1}
                modules={[Controller, EffectFade, Pagination]}
                controller={{ control: controlledSwiper }}
                navigation={false}
                pagination={{
                  enabled: true,
                  el: `.${styles.pagination}`,
                  bulletClass: styles.paginationBullet,
                  bulletActiveClass: styles.paginationBulletActive,
                }}
                effect="fade"
                fadeEffect={{ crossFade: true }} // Optional for smooth cross-fading
                onBeforeInit={swiper => {
                  swiperRef.current = swiper;
                }}>
                {imagesSrc?.map?.((src, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        key={src}
                        className={styles.taskImg}
                        src={src}
                        width={1100}
                        height={620}
                        alt="Завдання"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>

          <div className={styles.container}>
            {taskType === TASK_TYPE.MULTI_ANSWERS && isMobileVersion && (
              <div className={styles.footer}>
                <button
                  className={styles.navigationBtn}
                  type="button"
                  onClick={onPressPrevBtn}>
                  <span>
                    <ArrowRightSvg width={20} height={20} />
                  </span>
                </button>

                <div className={styles.pagination} />

                <button
                  className={styles.navigationBtn}
                  type="button"
                  onClick={onPressNextBtn}>
                  <span>
                    <ArrowRightSvg width={20} height={20} />
                  </span>
                </button>
              </div>
            )}

            {taskType === TASK_TYPE.DEFAULT && (
              <TextInputField placeholder="Введіть відповідь" />
            )}

            {taskType === TASK_TYPE.MULTI_ANSWERS &&
              (isMobileVersion ? (
                <Swiper
                  loop
                  enabled={false}
                  spaceBetween={0}
                  slidesPerView={1}
                  modules={[Controller, EffectFade]}
                  navigation={false}
                  pagination={false}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  onSwiper={setControlledSwiper}>
                  {imagesSrc?.map?.((src, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <TextInputField placeholder="Введіть відповідь" />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              ) : (
                <div className={styles.inputs}>
                  <TextInputField placeholder="Введіть відповідь" />
                  <TextInputField placeholder="Введіть відповідь" />
                  <TextInputField placeholder="Введіть відповідь" />
                </div>
              ))}

            {taskType === TASK_TYPE.OPEN_QUESTION && (
              <TextInputField placeholder="Введіть відповідь" multiline />
            )}
          </div>
        </>
      ) : (
        <Loader className="absolute-fill" />
      )}
    </div>
  );
};

export default TaskDescriptionCard;
