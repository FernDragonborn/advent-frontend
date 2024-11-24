'use client';

import {
  Button,
  CalendarPromo,
  DayDescription,
  EducationalProgramDescription,
  EventDescriptionCard,
  Socials,
} from '@/components';
import { GiftColoredSvg, MailsSvg, SnowflakeSvg, ToysSvg } from '@/svgs';
import styles from '@/styles/pages/HomePage.module.scss';

export default function Page() {
  const isLoggedIn = true;

  return (
    <main className={styles.wrapper}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Різдвяний{' '}
          <span>
            <SnowflakeSvg width={30} height={26} />
            адвент-календар
          </span>
        </h1>
        <ul className={styles.eventDescriptionCards}>
          <li>
            <EventDescriptionCard
              iconComponent={MailsSvg}
              isAccentTitle={isLoggedIn}
              title={
                isLoggedIn ? 'Разом веселіше!' : 'Зареєструйся для участі'
              }>
              {isLoggedIn ? (
                <>
                  <p>
                    За Нестайком, «Радість, не поділена з другом, – це не
                    радість, навіть не пів радості, а якась поганська
                    четвертушка, мізерія якась».
                  </p>
                  <p>
                    Запрошуй друзів до пригоди, спеціально для такої справи ми
                    дали більше часу для реєстрації ;)
                  </p>
                  <p>
                    <span className={styles.accent}>
                      Реєстрація доступна до 01.12.2024 (23:59)
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Додай інформацію про себе, щоб отримати доступ до
                    адвент-календаря, стати головним героєм різдвяної пригоди та
                    взяти участь у розіграші подарунків
                  </p>
                  <p>
                    <span className={styles.accent}>
                      Реєстрація доступна до 01.12.2024 (23:59)
                    </span>
                  </p>
                </>
              )}
            </EventDescriptionCard>
          </li>
          <li>
            <EventDescriptionCard
              iconComponent={ToysSvg}
              title={
                isLoggedIn
                  ? 'Виконуй завдання у календарі'
                  : 'Старт пригоди – 1 грудня'
              }>
              {isLoggedIn ? (
                <p>
                  Тобі це необхідно, щоб отримати суперзнання для проходження
                  різдвяної місії. Не хвилюйся, якщо доведеться пропустити.
                  Після відкриття віконечка, завдання будуть доступними до
                  виконання впродовж трьох днів.
                </p>
              ) : (
                <>
                  <p>
                    У календарі щодня активуватимуться віконечка із завданнями,
                    які будуть доступними до виконання впродовж трьох днів.
                  </p>
                  <p>
                    Занурюйтесь в історію, в якій станете головними героями
                    секретної різдвяної місії, та виконуйте завдання протягом 25
                    днів.
                  </p>
                </>
              )}
            </EventDescriptionCard>
          </li>
          <li>
            <EventDescriptionCard
              iconComponent={GiftColoredSvg}
              title={'Забирай справедливу  винагороду'}
              text={
                '26 грудня, серед учасників та учасниць, які своєчасно завершили історію, ми розіграємо подарунки до свят!'
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

      {isLoggedIn ? (
        <>
          <DayDescription />
          <EducationalProgramDescription />
        </>
      ) : (
        <CalendarPromo />
      )}
    </main>
  );
}
