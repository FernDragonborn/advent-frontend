import { GoogleSvg } from '@/svgs';
import { Button } from '@/components';
import styles from '@/styles/components/buttons/GoogleButton.module.scss'

const GoogleButton = ({ onClick }) => {
  return (
    <Button appearance="bordered" arrowPosition="none" onClick={onClick}>
      <GoogleSvg className={styles.icon} width={20} height={20} />
      Увійти з Google
    </Button>
  );
};

export default GoogleButton;
