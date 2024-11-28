'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';

import { CodeForm, LoginForm } from '@/components';
import { codeSchema, loginSchema } from '@/schemas';
import { useAuthMutation } from '@/hooks';
import { loginAction } from '@/actions';
import styles from '@/styles/pages/LoginPage.module.scss';
import { api } from '@/services';

const LOGIN_STEPS = { LOGIN: 'login', VERIFY_EMAIL: 'verify-email' };

export default function Page() {
  const [loginStep, setLoginStep] = useState(LOGIN_STEPS.LOGIN);
  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const codeForm = useForm({
    resolver: yupResolver(codeSchema),
    defaultValues: { code: '' },
  });

  const router = useRouter();

  const onGoogleLogin = useGoogleLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const loginMutation = useAuthMutation(
    {
      mutationFn: loginAction,
      onSuccess: ({ status, data }) => {
        if (data?.is_activated === false) {
          toast('Не підтверджений емейл', { type: 'warning' });
          return setLoginStep(LOGIN_STEPS.VERIFY_EMAIL);
        }

        if (status === 400 || status === 401) {
          loginForm.setError('email', { message: 'Невірний емейл або пароль' });
          loginForm.setError('password', {
            message: 'Невірний емейл або пароль',
          });
        }
        if (!data?.accessToken) {
          return toast('Помилка', { type: 'error' });
        }

        toast('Успіх', { type: 'success' });
        router.replace('/');
      },
    },
    false,
  );
  const verifyEmailMutation = useAuthMutation({
    mutationFn: api.auth.verifyEmail,
  });

  const onLogin = data =>
    loginMutation.mutate({
      ...data,
      grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
      client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
    });
  const onVerifyEmail = data =>
    verifyEmailMutation.mutate({
      ...data,
      email: loginForm.getValues().email,
    });

  return (
    <>
      <h1 className="visually-hidden">Вхід</h1>

      {loginStep === LOGIN_STEPS.LOGIN && (
        <LoginForm
          isLoading={loginMutation.isPending}
          formControl={loginForm.control}
          onSubmit={loginForm.handleSubmit(onLogin)}
          onGoogleLogin={onGoogleLogin}
        />
      )}
      {loginStep === LOGIN_STEPS.VERIFY_EMAIL && (
        <CodeForm
          formControl={codeForm.control}
          isLoading={verifyEmailMutation.isPending}
          onSubmit={codeForm.handleSubmit(onVerifyEmail)}
          onBack={() => setLoginStep(LOGIN_STEPS.LOGIN)}
        />
      )}

      <footer className={styles.footer}>
        <span className={styles.text}>
          Ще не зареєструвались?{' '}
          <Link className={styles.link} href="/signup">
            Реєстрація
          </Link>
        </span>
      </footer>
    </>
  );
}
