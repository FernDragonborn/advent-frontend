import Link from 'next/link';
import clsx from 'clsx';

import { FacebookSvg, InstagramSvg, LinkedInSvg, XSvg } from '@/svgs';
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
        <Link
          href="https://www.facebook.com/osvitniy.soup.ndu"
          target="_blank"
          rel="noopener noreferrer nofollow">
          <FacebookSvg width={24} height={24} />
          {isVerbose && 'Facebook'}
        </Link>
      </li>
      <li>
        <Link
          href="https://www.instagram.com/osvitniy.soup.ndu/?hl=uk"
          target="_blank"
          rel="noopener noreferrer nofollow">
          <InstagramSvg width={24} height={24} />
          {isVerbose && 'Instagram'}
        </Link>
      </li>
      <li>
        <Link
          href="https://x.com/teach4ukraine"
          target="_blank"
          rel="noopener noreferrer nofollow">
          <XSvg width={24} height={24} />
          {isVerbose && 'X'}
        </Link>
      </li>
      <li>
        <Link
          href="https://de.linkedin.com/company/teach-for-ukraine"
          target="_blank"
          rel="noopener noreferrer nofollow">
          <LinkedInSvg width={24} height={24} />
          {isVerbose && 'LinkedIn'}
        </Link>
      </li>
    </ul>
  );
};

export default Socials;
