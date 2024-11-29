'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Button, CodeForm, LoginForm } from '@/components';
import { codeSchema, loginSchema } from '@/schemas';
import { useAuthMutation, useAuthQuery } from '@/hooks';
import { loginAction } from '@/actions';
import { api } from '@/services';
import styles from '@/styles/pages/LoginPage.module.scss';

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
  const searchParams = useSearchParams();

  const loginGoogleQuery = useAuthQuery({
    queryFn: api.auth.getGoogleAuthUrl,
    queryKey: ['login-google'],
    staleTime: 0,
  });

  const loginGoogleMutation = useAuthMutation({
    mutationFn: api.auth.loginGoogle,
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
    onSuccess: () => setLoginStep(LOGIN_STEPS.LOGIN),
    onError: ({ status }) =>
      status === 400 &&
      codeForm.setError('code', {
        message: 'Недійсний або прострочений код підтвердження',
      }),
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

      {/* <Button
        onClick={() =>
          loginGoogleMutation.mutate({
            ...Object.fromEntries(searchParams),
            access_token: searchParams.get('code'),
          })
        }>
        login google
      </Button> */}

      {loginStep === LOGIN_STEPS.LOGIN && (
        <LoginForm
          isLoading={loginMutation.isPending}
          formControl={loginForm.control}
          loginGoogleHref={loginGoogleQuery.data?.authorization_url}
          onSubmit={loginForm.handleSubmit(onLogin)}
        />
      )}
      {loginStep === LOGIN_STEPS.VERIFY_EMAIL && (
        <CodeForm
          formControl={codeForm.control}
          userEmail={loginForm.getValues().email}
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
