import styles from '@/styles/layouts/AuthLayout.module.scss';

export default function Layout({ children }) {
  return <main className={styles.wrapper}>{children}</main>;
}
