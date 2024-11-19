import Link from 'next/link';

import { FacebookSvg, InstagramSvg, XSvg } from '@/svgs';
import styles from '@/styles/components/common/Socials.module.scss';

const Socials = ({}) => {
  return (
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
  );
};

export default Socials;
