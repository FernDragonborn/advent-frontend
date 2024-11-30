'use client';

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Loader, PasswordForm, ResetPasswordEmailForm } from '@/components';
import { passwordManageSchema, resetPasswordEmailSchema } from '@/schemas';
import { useAuthMutation, useAuthQuery } from '@/hooks';
import { api } from '@/services';
import styles from '@/styles/pages/LoginPage.module.scss';

const RESET_STEPS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export default function Page() {
  const [resetStep, setResetStep] = useState(RESET_STEPS.EMAIL);

  const router = useRouter();
  const searchParams = useSearchParams();

  const uidb64 = searchParams.get('uidb64');
  const token = searchParams.get('token');

  useLayoutEffect(() => {
    !!(uidb64 && token) && setResetStep(RESET_STEPS.PASSWORD);
  }, [uidb64, token]);

  const resetPasswordEmailForm = useForm({
    resolver: yupResolver(resetPasswordEmailSchema),
    defaultValues: { email: '' },
  });
  const passwordForm = useForm({
    resolver: yupResolver(passwordManageSchema),
    defaultValues: { password: '', passwordConfirmation: '' },
  });

  const resetPasswordMutation = useAuthMutation(
    {
      mutationFn: api.auth.passwordReset,
      onSuccess: ({ detail }) => toast(detail, { type: 'success' }),
    },
    false,
  );

  const resetPasswordConfirmQuery = useAuthQuery({
    queryFn: () =>
      api.auth.passwordResetConfirm({ uidb64, token }).catch(({ error }) => {
        toast(error, { type: 'error' });
        setResetStep(RESET_STEPS.EMAIL);
      }),
    queryKey: ['reset-password-confirm', { uidb64, token }],
    enabled: !!(uidb64 && token),
  });

  const resetPasswordCompleteMutation = useAuthMutation(
    {
      mutationFn: api.auth.passwordResetComplete,
      onSuccess: ({ detail }) => {
        toast(detail, { type: 'success' });
        router.replace('/login');
      },
    },
    false,
  );

  return (
    <>
      <h1 className="visually-hidden">Скидання паролю</h1>

      {resetPasswordConfirmQuery.isLoading ? (
        <Loader />
      ) : (
        <>
          {resetStep === RESET_STEPS.EMAIL && (
            <ResetPasswordEmailForm
              formControl={resetPasswordEmailForm.control}
              isLoading={resetPasswordMutation.isPending}
              onSubmit={resetPasswordEmailForm.handleSubmit(({ email }) =>
                resetPasswordMutation.mutate({ email }),
              )}
              onBack={() => router.back()}
            />
          )}
          {resetStep === RESET_STEPS.PASSWORD && (
            <PasswordForm
              title="Новий пароль"
              formControl={passwordForm.control}
              isLoading={resetPasswordCompleteMutation.isPending}
              onSubmit={passwordForm.handleSubmit(({ password }) =>
                resetPasswordCompleteMutation.mutate({
                  password,
                  uidb64,
                  token,
                }),
              )}
              onBack={() => setResetStep(RESET_STEPS.EMAIL)}
            />
          )}
        </>
      )}

      <footer className={styles.footer}>
        <span className={styles.text}>
          Уже зареєстрований?{' '}
          <Link className={styles.link} href="/login">
            Увійти
          </Link>
        </span>
      </footer>
    </>
  );
}
