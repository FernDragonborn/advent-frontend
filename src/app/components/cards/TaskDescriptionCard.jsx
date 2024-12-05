'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Controller as FormController } from 'react-hook-form';
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
import clsx from 'clsx';

const CONTENT_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
};

const TaskDescriptionCard = ({
  data,
  answersNumber,
  isMobileVersion,
  formControl,
}) => {
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState(undefined);
  const swiperRef = useRef(null);

  const onPressPrevBtn = () => swiperRef.current?.slidePrev?.();
  const onPressNextBtn = () => swiperRef.current?.slideNext?.();

  const answersIndexes = Array.from(Array(answersNumber).keys());
  const firstItem = data?.[0];

  return (
    <div className={styles.card}>
      <div className={styles.images}>
        {data?.length > 1 ? (
          <Swiper
            ref={swiperRef}
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
            onActiveIndexChange={swiper =>
              setSwiperActiveIndex(swiper.activeIndex)
            }
            onBeforeInit={swiper => {
              swiperRef.current = swiper;
            }}>
            {data?.map?.(({ type, src }) => {
              return (
                <SwiperSlide key={src}>
                  {type === CONTENT_TYPE.VIDEO ? (
                    <div className={styles.videoWrapper}>
                      <p className={styles.text}>Переглянь відео.</p>
                      <VideoPlayer
                        className={styles.video}
                        src={
                          'https://www.youtube.com/embed/obWPbMo-QTE?si=w4I__ENJV9Pc685O'
                        }
                      />
                    </div>
                  ) : (
                    <Image
                      key={src}
                      className={styles.taskImg}
                      src={src}
                      width={1100}
                      height={620}
                      alt="Завдання"
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : firstItem?.type === CONTENT_TYPE.VIDEO ? (
          <VideoPlayer
            className={styles.video}
            src={
              firstItem?.src ||
              'https://www.youtube.com/embed/obWPbMo-QTE?si=w4I__ENJV9Pc685O'
            }
          />
        ) : (
          <Image
            className={styles.taskImg}
            src={firstItem?.src}
            width={1100}
            height={620}
            alt="Завдання"
          />
        )}
      </div>

      <div className={styles.container}>
        {data?.length > 1 && (
          <div className={styles.footer}>
            <button
              className={clsx(
                styles.navigationBtn,
                swiperActiveIndex === 0 && styles.disabled,
              )}
              type="button"
              onClick={onPressPrevBtn}>
              <span>
                <ArrowRightSvg width={20} height={20} />
              </span>
            </button>
            <div className={styles.pagination} />
            <button
              className={clsx(
                styles.navigationBtn,
                swiperActiveIndex === data?.length - 1 && styles.disabled,
              )}
              type="button"
              onClick={onPressNextBtn}>
              <span>
                <ArrowRightSvg width={20} height={20} />
              </span>
            </button>
          </div>
        )}

        {answersNumber < 2 ? (
          <FormController
            name="answer_1"
            control={formControl}
            render={({ field, fieldState: { error } }) => (
              <TextInputField
                placeholder="Введіть відповідь"
                multiline={!answersNumber}
                error={error}
                {...field}
              />
            )}
          />
        ) : isMobileVersion ? (
          <Swiper
            enabled={false}
            spaceBetween={0}
            slidesPerView={1}
            modules={[Controller, EffectFade]}
            navigation={false}
            pagination={false}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            onSwiper={setControlledSwiper}>
            {answersIndexes.map(val => {
              return (
                <SwiperSlide key={val}>
                  <FormController
                    name={`answer_${val + 1}`}
                    control={formControl}
                    render={({ field, fieldState: { error } }) => (
                      <TextInputField
                        placeholder="Введіть відповідь"
                        error={error}
                        {...field}
                      />
                    )}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className={styles.inputs}>
            {answersIndexes.map(val => {
              return (
                <SwiperSlide key={val}>
                  <FormController
                    name={`answer_${val + 1}`}
                    control={formControl}
                    render={({ field, fieldState: { error } }) => (
                      <TextInputField
                        placeholder="Введіть відповідь"
                        error={error}
                        {...field}
                      />
                    )}
                  />
                </SwiperSlide>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDescriptionCard;
