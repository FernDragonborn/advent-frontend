'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';

import {
  Button,
  CountdownLabel,
  MobileMenu,
  NavLink,
  UserScore,
} from '@/components';
import { LogoSvg, UserSvg, WidgetSvg } from '@/svgs';
import { COOKIES } from '@/constants';
import styles from '@/styles/components/layout/Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!getCookie(COOKIES.ACCESS_TOKEN);

  return (
    <header className={styles.header}>
      <Link href="/">
        <LogoSvg className={styles.logo} width={60} height={25} />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.links}>
            <li>
              <NavLink href="/">Головна</NavLink>
            </li>
            <li>
              <NavLink href="/calendar">Календар</NavLink>
            </li>
          </ul>
        </nav>

        <CountdownLabel className={styles.countdown} />
      </div>

      <Button
        className={styles.menuBtn}
        arrowPosition="none"
        appearance="bordered"
        onClick={() => setIsMobileMenuOpen(true)}>
        Меню <WidgetSvg width={16} height={16} />
      </Button>

      <div className={styles.actions}>
        {isLoggedIn ? (
          <Button
            appearance="bordered"
            arrowPosition="none"
            as={Link}
            href="/settings">
            Профіль <UserSvg width={16} height={16} />
          </Button>
        ) : (
          <>
            <Button appearance="orange" as={Link} href="/signup">
              Реєстрація
            </Button>
            <Button appearance="bordered" as={Link} href="/login">
              Увійти
            </Button>
          </>
        )}
      </div>

      {isLoggedIn && <UserScore className={styles.score} score={0} />}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onHide={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
