'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoginForm } from '@/components';
import { loginSchema } from '@/schemas';
import styles from '@/styles/pages/LoginPage.module.scss';

export default function Page() {
  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  return (
    <>
      <h1 className="visually-hidden">Вхід</h1>

      <LoginForm
        formControl={loginForm.control}
        onSubmit={loginForm.handleSubmit(() => alert('hello'))}
      />

      <footer className={styles.footer}>
        <span className={styles.text}>
          Ще не зареєстувався?{' '}
          <Link className={styles.link} href="/signup">
            Реєстрація
          </Link>
        </span>
      </footer>
    </>
  );
}
