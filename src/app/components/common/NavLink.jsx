'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import styles from '@/styles/components/common/NavLink.module.scss';

const NavLink = ({
  className,
  href,
  shouldHighlightActive = true,
  ...props
}) => {
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        styles.link,
        shouldHighlightActive && pathname === href && styles.active,
        className,
      )}
      href={href}
      {...props}
    />
  );
};

export default NavLink;
