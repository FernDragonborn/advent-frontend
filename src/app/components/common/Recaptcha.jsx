'use client';

import { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

import styles from '@/styles/components/common/Recaptcha.module.scss';

const Recaptcha = ({ setIsVerified }, ref) => {
  const handleCaptchaSubmission = async token => {
    try {
      if (token) {
        await axios.post('/frontend-api/recaptcha', { token });
        setIsVerified(true);
      }
    } catch (e) {
      setIsVerified(false);
    }
  };

  const handleExpired = () => {
    setIsVerified(false);
  };

  return (
    <ReCAPTCHA
      className={styles.wrapper}
      ref={ref}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      onChange={handleCaptchaSubmission}
      onExpired={handleExpired}
    />
  );
};

export default forwardRef(Recaptcha);
