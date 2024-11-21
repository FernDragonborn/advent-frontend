import Link from 'next/link';

import { Button, NavLink, Socials } from '@/components';
import { LogoEcwSvg, LogoSvg } from '@/svgs';
import styles from '@/styles/components/layout/Footer.module.scss';
import clsx from 'clsx';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.generalInfo}>
          <div className={styles.logos}>
            <LogoSvg width={130} height={66} />
            <LogoEcwSvg width={162} height={72} />
          </div>
          <p className={styles.text}>
            Освітня ініціатива, що допомагає українським школам та вчителям
            інтегрувати новітні підходи у навчальний процес для якісної освіти.
          </p>
        </div>

        <div className={styles.links}>
          <div>
            <span className={styles.label}>САЙТ</span>
            <nav className={styles.nav}>
              <ul>
                <li>
                  <NavLink href="/" shouldHighlightActive={false}>
                    Головна
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/calendar" shouldHighlightActive={false}>
                    Календар
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/terms" shouldHighlightActive={false}>
                    Умови розіграшу
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <span className={styles.label}>СОЦ. МЕРЕЖІ</span>
            <Socials isVerbose isDark isVertical />
          </div>
        </div>

        <div>
          <span className={styles.label}>
            Переходь до календаря та бери участь
          </span>
          <p className={clsx(styles.text, styles.light)}>
            Святковий набір із щоденними завданнями, які потрібно виконувати,
            щоб отримати можливість взяти участь у розіграші призів.
          </p>

          <Button
            className={styles.btn}
            appearance="orange"
            as={Link}
            href="/calendar">
            До календаря
          </Button>
        </div>
      </div>

      <p className={styles.copyright}>
        © Copyright 2024 - Teach For All © Громадська організація «Навчай для
        України». Дизайн та розробка:{' '}
        <Link
          className={styles.link}
          href=""
          target="_blank"
          rel="noopener noreferrer nofollow">
          ETC
        </Link>{' '}
        та{' '}
        <Link
          className={styles.link}
          href=""
          target="_blank"
          rel="noopener noreferrer nofollow">
          DoAll Team
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
