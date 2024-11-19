import Link from 'next/link';
import clsx from 'clsx';

import {
  Button,
  CountdownLabel,
  NavLink,
  Portal,
  UserScore,
} from '@/components';
import {
  CrossSvg,
  FacebookSvg,
  InstagramSvg,
  LogoSvg,
  UserSvg,
  XSvg,
} from '@/assets/images/svgs';
import styles from '@/styles/components/sidebars/MobileMenu.module.scss';

const MobileMenu = ({ isOpen, onHide }) => {
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
          </ul>
        </nav>
        <span className={styles.separator} />
        <CountdownLabel />
        <span className={styles.separator} />

        <div className={styles.actions}>
          <Button appearance="orange" as={Link} href="/signup">
            Реєстрація
          </Button>
          <Button appearance="bordered" as={Link} href="/login">
            Увійти
          </Button>
        </div>

        {/* <div className={clsx(styles.actions, styles.authedActions)}>
          <UserScore score={23} />
          <Button
            appearance="bordered"
            arrowPosition="none"
            as={Link}
            href="/profile">
            Профіль <UserSvg width={16} height={16} />
          </Button>
        </div> */}

        <ul className={styles.socials}>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer nofollow">
              <FacebookSvg width={24} height={24} />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer nofollow">
              <InstagramSvg width={24} height={24} />
            </Link>
          </li>
          <li>
            <Link href="" target="_blank" rel="noopener noreferrer nofollow">
              <XSvg width={24} height={24} />
            </Link>
          </li>
        </ul>
      </aside>
    </Portal>
  );
};

export default MobileMenu;
