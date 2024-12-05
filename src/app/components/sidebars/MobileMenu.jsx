'use client';

import { useCallback, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import clsx from 'clsx';

import {
  Button,
  CountdownLabel,
  NavLink,
  Portal,
  Socials,
  UserScore,
} from '@/components';
import { useFetchProfile } from '@/hooks';
import { COOKIES } from '@/constants';
import { CrossSvg, LogoSvg, UserSvg } from '@/svgs';
import styles from '@/styles/components/sidebars/MobileMenu.module.scss';

const MobileMenu = ({ isOpen, onHide }) => {
  const [shouldShowCountdownLabel, setShouldShowCountdownLabel] =
    useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const profileQuery = useFetchProfile();

  useLayoutEffect(() => {
    setIsLoggedIn(!!getCookie(COOKIES.ACCESS_TOKEN));
  }, []);

  const onCompleteCountDown = useCallback(
    () => setShouldShowCountdownLabel(false),
    [],
  );

  return (
    <Portal containerId="modal-root">
      <aside className={clsx(styles.wrapper, isOpen && styles.isOpen)}>
        <button className={styles.closeBtn} onClick={onHide}>
          <CrossSvg width={24} height={24} />
        </button>
        <Link href="/">
          <LogoSvg className={styles.logo} width={110} height={46} />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.links}>
            <li>
              <NavLink href="/">ГОЛОВНА</NavLink>
            </li>
            <li>
              <NavLink href="/calendar">КАЛЕНДАР</NavLink>
            </li>
            <li>
              <NavLink href="/terms">Умови участі</NavLink>
            </li>
          </ul>
        </nav>
        <span className={styles.separator} />

        {shouldShowCountdownLabel && (
          <>
            <CountdownLabel onComplete={onCompleteCountDown} />
            <span className={styles.separator} />{' '}
          </>
        )}

        {isLoggedIn ? (
          <div className={clsx(styles.actions, styles.authedActions)}>
            <UserScore score={profileQuery.data?.total_task_points || 0} />
            <Button
              appearance="bordered"
              arrowPosition="none"
              as={Link}
              href="/settings">
              Профіль <UserSvg width={16} height={16} />
            </Button>
          </div>
        ) : (
          <div className={styles.actions}>
            <Button appearance="orange" as={Link} href="/signup">
              Реєстрація
            </Button>
            <Button appearance="bordered" as={Link} href="/login">
              Увійти
            </Button>
          </div>
        )}

        <Socials />
      </aside>
    </Portal>
  );
};

export default MobileMenu;
