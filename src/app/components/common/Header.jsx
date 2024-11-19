'use client';

import { useState } from 'react';
import Link from 'next/link';

import {
  Button,
  CountdownLabel,
  MobileMenu,
  NavLink,
  UserScore,
} from '@/components';
import { LogoSvg, UserSvg, WidgetSvg } from '@/svgs';
import styles from '@/styles/components/common/Header.module.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <Button appearance="orange" as={Link} href="/signup">
          Реєстрація
        </Button>
        <Button appearance="bordered" as={Link} href="/login">
          Увійти
        </Button>

        <Button
          appearance="bordered"
          arrowPosition="none"
          as={Link}
          href="/profile">
          Профіль <UserSvg width={16} height={16} />
        </Button>
      </div>

      <UserScore className={styles.score} score={23} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onHide={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
