import Link from 'next/link';
import clsx from 'clsx';

import { FacebookSvg, InstagramSvg, XSvg } from '@/svgs';
import styles from '@/styles/components/common/Socials.module.scss';

const Socials = ({ className, isVerbose, isDark, isVertical }) => {
  return (
    <ul
      className={clsx(
        styles.socials,
        isDark && styles.isDark,
        isVertical && styles.isVertical,
        className,
      )}>
      <li>
        <Link href="" target="_blank" rel="noopener noreferrer nofollow">
          <FacebookSvg width={24} height={24} />
          {isVerbose && 'Facebook'}
        </Link>
      </li>
      <li>
        <Link href="" target="_blank" rel="noopener noreferrer nofollow">
          <InstagramSvg width={24} height={24} />
          {isVerbose && 'Instagram'}
        </Link>
      </li>
      <li>
        <Link href="" target="_blank" rel="noopener noreferrer nofollow">
          <XSvg width={24} height={24} />
          {isVerbose && 'X'}
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
