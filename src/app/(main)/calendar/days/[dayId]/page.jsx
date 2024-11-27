'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { Button, CalendarCountdown, HeroSection } from '@/components';
import { SnowflakeSvg } from '@/svgs';
import styles from '@/styles/pages/DayPage.module.scss';
import { useParams } from 'next/navigation';

export default function Page() {
  const { dayId } = useParams();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <Image
          className={styles.narrativeImg}
          src={'/images/auth/child.jpg'}
          width={290}
          height={295}
          alt="Картка"
        />

        <div className={styles.container}>
          <p className={styles.text}>
            От халепа! Ми тільки-но налаштувалися на нові пригоди, аж раптом —
            бац! — світло зникло, як морозиво в літню спеку! Ну точно, це
            дорослі щось накрутили, щоб завадити нашій суперважливій місії.
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
          <p className={styles.text}>
            Світло зникло — темно, як у носі в бегемота. Аж хочеться лампочку
            прикрутити до голови, щоб хоч щось розгледіти! Без електрики все
            зупинилося: ні тобі зарядки для телефону, ні котиків у ТікТоці! Ну
            що ж, тепер наше завдання — знайти цей секретний шифр-ключ і
            повернути ясність, блиск і... ТікТок, звісно!
          </p>
        </div>
      </div>
      <Button
        className={styles.submitBtn}
        appearance="orange"
        onClick={() => null}>
        Продовжити
      </Button>
    </div>
  );
}
