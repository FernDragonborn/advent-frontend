import { HeroSection } from '@/components';
import styles from '@/styles/layouts/CalendarLayout.module.scss';

export default function Layout({ children }) {
  return (
    <main className={styles.wrapper}>
      <HeroSection>
        <div className={styles.container}>{children}</div>
      </HeroSection>
    </main>
  );
}
