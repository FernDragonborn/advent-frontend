'use client';

import { Button, EventDescriptionCard, Socials } from '@/components';
import { GiftColoredSvg, MailsSvg, SnowflakeSvg, ToysSvg } from '@/svgs';
import styles from '@/styles/pages/HomePage.module.scss';

export default function Page() {
  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Новорічний{' '}
          <span>
            <SnowflakeSvg width={30} height={26} />
            Адвент календар
          </span>
        </h1>
        <ul className={styles.eventDescriptionCards}>
          <li>
            <EventDescriptionCard
              iconComponent={MailsSvg}
              title={'Реєструйся для участі'}>
              <p>
                Додай інформацію про себе щоб взаємодіяти з календарем та взяти
                участь у розіграші
              </p>
              <p>
                <span className={styles.accent}>
                  Реєстрація доступна до 01.12.24
                </span>{' '}
                - тож поспішай.
              </p>
            </EventDescriptionCard>
          </li>
          <li>
            <EventDescriptionCard
              iconComponent={ToysSvg}
              title={'Виконуй завдання у календарі'}
              text={
                'Виконуй нові завадання щодня. Якщо пропустиш завдання воно буде доступне лише три дні.'
              }
            />
          </li>
          <li>
            <EventDescriptionCard
              iconComponent={GiftColoredSvg}
              title={'Бери участь в розіграші'}
              text={
                'Слідкуй за нашими соцмережами, щоб побачити результати розіграшу.'
              }>
              <Socials />
            </EventDescriptionCard>
          </li>
        </ul>

        <Button
          className={styles.centeredBtn}
          appearance="orange"
          onClick={() => null}>
          Взяти участь
        </Button>
      </section>
    </main>
  );
}
