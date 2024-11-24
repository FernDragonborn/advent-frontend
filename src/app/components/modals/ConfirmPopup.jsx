import { Button, ModalWrapper } from '@/app/components';
import { CrossSvg } from '@/assets/images/svgs';
import styles from '@/styles/components/modals/ConfirmPopup.module.scss';

const ConfirmPopup = ({
  isOpen,
  title,
  question,
  cancelBtnLabel,
  submitBtnLabel,
  onSubmit,
  onHide,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onHide={onHide}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.question}>{question}</p>

        <div className={styles.actions}>
          <Button appearance="bordered" arrowPosition="left" onClick={onHide}>
            {cancelBtnLabel || 'Повернутись'}
          </Button>
          <Button onClick={onSubmit}>{submitBtnLabel || 'Вийти'}</Button>
        </div>

        <button className={styles.closeBtn} type="button" onClick={onHide}>
          <CrossSvg width={24} height={24} />
        </button>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmPopup;
