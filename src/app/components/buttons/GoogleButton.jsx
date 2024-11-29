import Link from 'next/link';

import { GoogleSvg } from '@/svgs';
import { Button } from '@/components';
import styles from '@/styles/components/buttons/GoogleButton.module.scss';

const GoogleButton = ({ href }) => {
  return (
    <Button
      appearance="bordered"
      arrowPosition="none"
      as={Link}
      href={href || ''}
      rel="noopener noreferrer nofollow">
      <GoogleSvg className={styles.icon} width={20} height={20} />
      Увійти з Google
    </Button>
  );
};

export default GoogleButton;
