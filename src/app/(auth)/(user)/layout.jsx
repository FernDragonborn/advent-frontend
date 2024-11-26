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
            Допоможіть своєму диву трапитися!
          </span>
          <p className={styles.descriptionText}>
            Іноді, щоб впустити диво у своє життя, йому потрібно відчинити
            двері.. або віконечко різдвяного адвент-календаря. Відчиняйте
            віконечка щодня, аби відчуття свята залишалось з вами впродовж
            всього грудня ✨
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
