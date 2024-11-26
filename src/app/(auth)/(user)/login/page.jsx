'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';

import { LoginForm } from '@/components';
import { loginSchema } from '@/schemas';
import { useAuthMutation } from '@/hooks';
import { loginAction } from '@/actions';
import styles from '@/styles/pages/LoginPage.module.scss';

export default function Page() {
  const { control, handleSubmit, setError } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
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
        if (status === 400 || status === 401) {
          setError('email', { message: 'Невірний емейл або пароль' });
          setError('password', { message: 'Невірний емейл або пароль' });
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

  const onLogin = data =>
    loginMutation.mutate({
      ...data,
      grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
      client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
    });

  return (
    <>
      <h1 className="visually-hidden">Вхід</h1>

      <LoginForm
        isLoading={loginMutation.isPending}
        formControl={control}
        onSubmit={handleSubmit(onLogin)}
        onGoogleLogin={onGoogleLogin}
      />
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
