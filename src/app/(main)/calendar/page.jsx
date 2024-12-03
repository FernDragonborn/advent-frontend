import { CalendarCountdown, HeroSection } from '@/components';
import { SnowflakeSvg } from '@/svgs';
import styles from '@/styles/pages/ComingSoonPage.module.scss';

export default function Page() {
  return (
    <main className={styles.wrapper}>
      <HeroSection>
        <div className={styles.container}>
          <h1 className={styles.title}>
            До відкриття{' '}
            <span>
              <SnowflakeSvg width={30} height={26} />
              адвент-календаря
            </span>
          </h1>

          <CalendarCountdown className={styles.countdown} />
        </div>
      </HeroSection>
    </main>
  );
}
