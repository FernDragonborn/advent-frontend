import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import styles from '@/styles/components/common/StyledToastContainer.module.scss';

const StyledToastContainer = () => {
  return (
    <ToastContainer
      className={styles.wrapper}
      toastClassName={styles.toast}
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default StyledToastContainer;
