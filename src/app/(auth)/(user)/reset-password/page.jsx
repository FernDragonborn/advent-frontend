'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { CodeForm, PasswordForm, ResetPasswordEmailForm } from '@/components';
import {
  codeSchema,
  passwordManageSchema,
  resetPasswordEmailSchema,
} from '@/schemas';
import styles from '@/styles/pages/LoginPage.module.scss';

const RESET_STEPS = {
  EMAIL: 'email',
  CODE: 'code',
  PASSWORD: 'password',
};

export default function Page() {
  const [signupStep, setSignupStep] = useState(RESET_STEPS.EMAIL);

  const router = useRouter();

  const resetPasswordEmailForm = useForm({
    resolver: yupResolver(resetPasswordEmailSchema),
    defaultValues: { email: '' },
  });
  const codeForm = useForm({
    resolver: yupResolver(codeSchema),
    defaultValues: { code: '' },
  });
  const passwordForm = useForm({
    resolver: yupResolver(passwordManageSchema),
    defaultValues: { password: '', passwordConfirmation: '' },
  });

  return (
    <>
      <h1 className="visually-hidden">Скидання паролю</h1>

      {signupStep === RESET_STEPS.EMAIL && (
        <ResetPasswordEmailForm
          formControl={resetPasswordEmailForm.control}
          onSubmit={resetPasswordEmailForm.handleSubmit(() =>
            setSignupStep(RESET_STEPS.CODE),
          )}
          onBack={() => router.back()}
        />
      )}
      {signupStep === RESET_STEPS.CODE && (
        <CodeForm
          formControl={codeForm.control}
          onSubmit={codeForm.handleSubmit(() =>
            setSignupStep(RESET_STEPS.PASSWORD),
          )}
          onBack={() => setSignupStep(RESET_STEPS.EMAIL)}
        />
      )}
      {signupStep === RESET_STEPS.PASSWORD && (
        <PasswordForm
          title="Новий пароль"
          formControl={passwordForm.control}
          onSubmit={passwordForm.handleSubmit(() =>
            setSignupStep(RESET_STEPS.EMAIL),
          )}
          onBack={() => setSignupStep(RESET_STEPS.CODE)}
        />
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
