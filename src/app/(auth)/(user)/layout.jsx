import Image from 'next/image';

import { LogoSvg, DecorationDotsSvg } from '@/svgs';
import styles from '@/styles/pages/LoginPage.module.scss';

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.sidebarColumn}>
        <Image
          src="/images/auth/deer.svg"
          width={250}
          height={306}
          alt="Новорічний олень"
        />

        <Image
          className={styles.coveredImage}
          src="/images/auth/girl.jpg"
          width={330}
          height={520}
          alt="Дитина"
        />
      </div>

      <div className={styles.sidebarColumn}>
        <div className={styles.descriptionCard}>
          <span className={styles.descriptionLabel}>
            Відкривайте дива разом!
          </span>
          <p className={styles.descriptionText}>
            Відкривайте дверцята щодня, щоб наповнити грудень радістю та теплом.
            Кожен день — це новий сюрприз, маленький момент щастя, що наближає
            до найчарівнішого свята року! ✨
          </p>
        </div>
        <Image
          src="/images/auth/gloves.svg"
          width={330}
          height={217}
          alt="Дитина"
        />
      </div>

      <div>
        <div className={styles.logoWrapper}>
          <LogoSvg className={styles.logo} width={110} height={46} />
          <DecorationDotsSvg className={styles.dots} width={120} height={24} />
        </div>
        {children}
      </div>
    </>
  );
}
