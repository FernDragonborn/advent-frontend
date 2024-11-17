'use client';

import clsx from 'clsx';

import { Portal } from '@/components';
import { useToggleGlobalScrollBlock } from '@/hooks';
import styles from '@/styles/components/wrappers/ModalWrapper.module.scss';

const ModalWrapper = ({
  isOpen,
  shouldCloseOnClickContent,
  className,
  onHide,
  children,
}) => {
  useToggleGlobalScrollBlock(isOpen);

  return (
    <Portal containerId="modal-root">
      <div
        className={clsx(styles.backdrop, isOpen && styles.isOpen, className)}
        onClick={onHide}>
        <div
          className={styles.modal}
          onClick={
            shouldCloseOnClickContent ? undefined : e => e.stopPropagation()
          }>
          {children}
        </div>
      </div>
    </Portal>
  );
};

ModalWrapper.propTypes = {};

export default ModalWrapper;
