'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

import styles from '@/styles/components/cards/TaskDescriptionCard.module.scss';
import { TextInputField } from '@/app/components';
import { ArrowRightSvg } from '@/svgs';

const TASK_TYPE = {
  DEFAULT: 'default',
  OPEN_QUESTION: 'open-question',
  MULTI_ANSWERS: 'multi-answers',
};

const TaskDescriptionCard = ({ taskType, imagesSrc }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    console.dir(swiperRef.current?.slideNext);
  }, []);

  const onPressPrevBtn = () => {
    setActiveImageIndex(state => (state > 0 ? state - 1 : state));
  };

  const onPressNextBtn = () => {
    setActiveImageIndex(state =>
      state < imagesSrc?.length - 1 ? state + 1 : state,
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.images}>
        <Swiper
          // draggable
          ref={swiperRef}
          loop
          navigation={false}
          pagination={{
            enabled: true,
            el: `.${styles.pagination}`,
            bulletClass: styles.paginationBullet,
            bulletActiveClass: styles.paginationBulletActive,
          }}
          modules={[EffectFade, Pagination]} // Include the fade effect module
          effect="fade"
          fadeEffect={{ crossFade: true }} // Optional for smooth cross-fading
          spaceBetween={0}
          slidesPerView={1}
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
      </div>

      <div className={styles.container}>
        <div className={styles.footer}>
          <button
            className={styles.navigationBtn}
            type="button"
            onClick={() => swiperRef.current?.slidePrev?.()}>
            <span>
              <ArrowRightSvg width={20} height={20} />
            </span>
          </button>

          <div className={styles.pagination} />

          <button
            className={styles.navigationBtn}
            type="button"
            onClick={() => swiperRef.current?.slideNext?.()}>
            <span>
              <ArrowRightSvg width={20} height={20} />
            </span>
          </button>
        </div>
        <TextInputField placeholder="Введіть відповідь" />
        {/* <TextInputField placeholder="Введіть відповідь" multiline /> */}
      </div>
    </div>
  );
};

export default TaskDescriptionCard;
