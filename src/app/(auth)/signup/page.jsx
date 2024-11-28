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
  const [signupStep, setSignupStep] = useState(SIGNUP_STEPS.CODE);

  const userInfoForm = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: { name: '', gender: '', region: '', grade: '' },
  });
  const contactInfoForm = useForm({
    resolver: yupResolver(contactInfoSchema),
    defaultValues: { email: '', phone_number: '' },
  });
  const passwordForm = useForm({
    resolver: yupResolver(passwordManageSchema),
    defaultValues: { password: '', passwordConfirmation: '' },
  });
  const codeForm = useForm({
    resolver: yupResolver(codeSchema),
    defaultValues: { code: '' },
  });
  const termsForm = useForm({
    resolver: yupResolver(termsSchema),
    defaultValues: { isAgreed: false },
  });

  const registerMutation = useAuthMutation({
    mutationFn: api.auth.register,
    onSuccess: () => setSignupStep(SIGNUP_STEPS.CODE),
    onError: ({ status, data }) => {
      const {
        name,
        gender,
        region,
        grade,
        email,
        phone_number,
        password,
        password2,
      } = data || {};

      if (status < 500) {
        setSignupStep(SIGNUP_STEPS.USER_INFO);
      }

      name && userInfoForm.setError('name', { message: name?.join('. ') });
      gender &&
        userInfoForm.setError('gender', { message: gender?.join('. ') });
      region &&
        userInfoForm.setError('region', { message: region?.join('. ') });
      grade && userInfoForm.setError('grade', { message: grade?.join('. ') });

      email &&
        contactInfoForm.setError('email', { message: email?.join('. ') });
      phone_number &&
        contactInfoForm.setError('phone_number', {
          message: phone_number?.join('. '),
        });

      password &&
        passwordForm.setError('password', { message: password?.join('. ') });
      password2 &&
        passwordForm.setError('passwordConfirmation', {
          message: password2?.join('. '),
        });
    },
  });
  const verifyEmailMutation = useAuthMutation({
    mutationFn: api.auth.verifyEmail,
  });

  const onRegister = () =>
    registerMutation.mutate({
      ...userInfoForm.getValues(),
      ...contactInfoForm.getValues(),
      ...passwordForm.getValues(),
      gender: userInfoForm.getValues().gender?.id,
      grade: userInfoForm.getValues().grade?.id,
    });
  const onVerifyEmail = data =>
    verifyEmailMutation.mutate({
      ...data,
      email: contactInfoForm.getValues().email,
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
            formControl={contactInfoForm.control}
            onSubmit={contactInfoForm.handleSubmit(() =>
              setSignupStep(SIGNUP_STEPS.PASSWORD),
            )}
            onBack={() => setSignupStep(SIGNUP_STEPS.USER_INFO)}
          />
        )}

        {signupStep === SIGNUP_STEPS.PASSWORD && (
          <PasswordForm
            isLoading={registerMutation.isPending}
            formControl={passwordForm.control}
            onSubmit={() => setSignupStep(SIGNUP_STEPS.TERMS)}
            onBack={() => setSignupStep(SIGNUP_STEPS.CONTACT_INFO)}
          />
        )}

        {signupStep === SIGNUP_STEPS.TERMS && (
          <TermsForm
            formControl={termsForm.control}
            onSubmit={termsForm.handleSubmit(onRegister)}
            onBack={() => setSignupStep(SIGNUP_STEPS.PASSWORD)}
          />
        )}

        {signupStep === SIGNUP_STEPS.CODE && (
          <CodeForm
            formControl={codeForm.control}
            onSubmit={codeForm.handleSubmit(onVerifyEmail)}
            onBack={() => setSignupStep(SIGNUP_STEPS.TERMS)}
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
