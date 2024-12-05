'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Controller, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/controller';

import { TextInputField, VideoPlayer } from '@/components';
import { ArrowRightSvg } from '@/svgs';
import styles from '@/styles/components/cards/TaskDescriptionCard.module.scss';

const TASK_TYPE = {
  DEFAULT: 'default',
  OPEN_QUESTION: 'open-question',
  MULTI_ANSWERS: 'multi-answers',
};

const TaskDescriptionCard = ({
  taskType,
  imagesSrc,
  answersNumber,
  isMobileVersion,
}) => {
  const [controlledSwiper, setControlledSwiper] = useState(undefined);
  const swiperRef = useRef(null);

  const onPressPrevBtn = () => swiperRef.current?.slidePrev?.();
  const onPressNextBtn = () => swiperRef.current?.slideNext?.();

  return (
    <div className={styles.card}>
      {/* <VideoPlayer
        className={styles.video}
        src={'https://www.youtube.com/embed/obWPbMo-QTE?si=w4I__ENJV9Pc685O'}
      /> */}

      <div className={styles.images}>
        {imagesSrc?.length < 2 ? (
          <Image
            className={styles.taskImg}
            src={imagesSrc?.[0]}
            width={1100}
            height={620}
            alt="Завдання"
          />
        ) : (
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
            {imagesSrc?.map?.(src => {
              return (
                <SwiperSlide key={src}>
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
        {imagesSrc?.length > 1 && isMobileVersion && (
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

        {imagesSrc?.length < 2 ? (
          <TextInputField
            placeholder="Введіть відповідь"
            multiline={!imagesSrc?.length}
          />
        ) : isMobileVersion ? (
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
        )}
      </div>
    </div>
  );
};

export default TaskDescriptionCard;
