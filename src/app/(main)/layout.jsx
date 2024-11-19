import { Header } from '@/components';
import styles from '@/styles/layouts/MainLayout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
}
