'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { useFetchProfile } from '@/hooks';
import styles from '@/styles/components/layout/Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const profileQuery = useFetchProfile();

  useLayoutEffect(() => {
    setIsLoggedIn(!!getCookie(COOKIES.ACCESS_TOKEN));
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
            <li>
              <NavLink href="/terms">Умови участі</NavLink>
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

      {isLoggedIn && (
        <UserScore
          className={styles.score}
          score={profileQuery.data?.total_task_points || 0}
        />
      )}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onHide={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
