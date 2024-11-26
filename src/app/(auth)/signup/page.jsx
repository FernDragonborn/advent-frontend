'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  UserInfoForm,
  ContactInfoForm,
  CodeForm,
  PasswordForm,
  TermsForm,
} from '@/components';
import { LogoSvg, DecorationDotsSvg } from '@/svgs';
import {
  codeSchema,
  contactInfoSchema,
  passwordManageSchema,
  termsSchema,
  userInfoSchema,
} from '@/schemas';
import styles from '@/styles/pages/SignupPage.module.scss';
import { useAuthMutation } from '@/hooks';
import { api } from '@/services';

const SIGNUP_STEPS = {
  USER_INFO: 'user-info',
  CONTACT_INFO: 'contact-info',
  CODE: 'code',
  PASSWORD: 'password',
  TERMS: 'terms',
};

export default function Page() {
  const [signupStep, setSignupStep] = useState(SIGNUP_STEPS.USER_INFO);

  const userInfoForm = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: { username: '', sex: '', region: '', grade: '' },
  });
  const contactInfoForm = useForm({
    resolver: yupResolver(contactInfoSchema),
    defaultValues: { email: '', phone: '' },
  });
  const codeForm = useForm({
    resolver: yupResolver(codeSchema),
    defaultValues: { code: '' },
  });
  const passwordForm = useForm({
    resolver: yupResolver(passwordManageSchema),
    defaultValues: { password: '', passwordConfirmation: '' },
  });
  const termsForm = useForm({
    resolver: yupResolver(termsSchema),
    defaultValues: { isAgreed: false },
  });

  const registerMutation = useAuthMutation({
    mutationFn: api.auth.register,
  });

  const onRegister = data =>
    registerMutation.mutate({
      ...data,
      // full_name: 'string',
      password2: data.password,
    });

  return (
    <>
      <div className={styles.sidebarColumn}>
        <Image
          src="/images/auth/deer.svg"
          width={250}
          height={306}
          alt="Новорічний олень"
        />
        <div className={styles.descriptionCard}>
          <span className={styles.descriptionLabel}>
            Відкривайте дива разом!
          </span>
          <p className={styles.descriptionText}>
            Відкривайте дверцята щодня, щоб наповнити грудень радістю та теплом.
            Кожен день — це новий сюрприз, маленький момент щастя, що наближає
            до найчарівнішого свята року! ✨
          </p>
        </div>
      </div>

      <div className={styles.sidebarColumn}>
        <Image
          className={styles.coveredImage}
          src="/images/auth/child.jpg"
          width={330}
          height={520}
          alt="Дитина"
        />
        <Image
          src="/images/auth/gloves.svg"
          width={330}
          height={217}
          alt="Дитина"
        />
      </div>

      <div>
        <div className={styles.logoWrapper}>
          <LogoSvg className={styles.logo} width={110} height={46} />
          <DecorationDotsSvg className={styles.dots} width={120} height={24} />
        </div>

        <h1 className="visually-hidden">Реєстрація</h1>

        {signupStep === SIGNUP_STEPS.USER_INFO && (
          <UserInfoForm
            formControl={userInfoForm.control}
            onSubmit={userInfoForm.handleSubmit(() =>
              setSignupStep(SIGNUP_STEPS.CONTACT_INFO),
            )}
          />
        )}
        {signupStep === SIGNUP_STEPS.CONTACT_INFO && (
          <ContactInfoForm
            // isLoading={registerMutation.isPending}
            formControl={contactInfoForm.control}
            onSubmit={contactInfoForm.handleSubmit(() =>
              setSignupStep(SIGNUP_STEPS.PASSWORD),
            )}
            onBack={() => setSignupStep(SIGNUP_STEPS.USER_INFO)}
          />
        )}

        {signupStep === SIGNUP_STEPS.PASSWORD && (
          <PasswordForm
            formControl={passwordForm.control}
            onSubmit={passwordForm.handleSubmit(onRegister)}
            onBack={() => setSignupStep(SIGNUP_STEPS.CONTACT_INFO)}
          />
        )}

        {signupStep === SIGNUP_STEPS.CODE && (
          <CodeForm
            formControl={codeForm.control}
            onSubmit={codeForm.handleSubmit(() =>
              setSignupStep(SIGNUP_STEPS.PASSWORD),
            )}
            onBack={() => setSignupStep(SIGNUP_STEPS.CONTACT_INFO)}
          />
        )}
        {signupStep === SIGNUP_STEPS.TERMS && (
          <TermsForm
            formControl={termsForm.control}
            onSubmit={termsForm.handleSubmit(console.log)}
            onBack={() => setSignupStep(SIGNUP_STEPS.PASSWORD)}
          />
        )}

        <footer className={styles.footer}>
          <span className={styles.text}>
            Уже зареєструвались?{' '}
            <Link className={styles.link} href="/login">
              Увійти
            </Link>
          </span>
        </footer>
      </div>
    </>
  );
}
