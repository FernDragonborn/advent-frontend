'use client';

import { useState } from 'react';

import {
  BackButton,
  ChangePasswordForm,
  ProfileForm,
  SettingsSidebar,
  SidebarButton,
} from '@/components';
import { useIsMobileVersion } from '@/hooks';
import {
  KeyFilledSvg,
  KeySvg,
  TaskSquareFilledSvg,
  TaskSquareSvg,
} from '@/svgs';
import styles from '@/styles/pages/SettingsPage.module.scss';

const SECTIONS = {
  SIDEBAR: 'sidebar',
  PROFILE_FORM: 'profileForm',
  PASSWORD_FORM: 'passwordForm',
};

export default function Page() {
  const [currentSection, setCurrentSection] = useState(SECTIONS.SIDEBAR);
  const isMobile = useIsMobileVersion();

  return (
    <main className={styles.wrapper}>
      <div className={styles.row}>
        <BackButton
          label={
            currentSection !== SECTIONS.SIDEBAR && isMobile
              ? 'Налаштування'
              : 'На головну'
          }
          onClick={
            currentSection !== SECTIONS.SIDEBAR && isMobile
              ? () => setCurrentSection(SECTIONS.SIDEBAR)
              : undefined
          }
        />
        <h1 className={styles.title}>Налаштування</h1>
      </div>
      <div className={styles.container}>
        {isMobile && currentSection !== SECTIONS.SIDEBAR ? null : (
          <SettingsSidebar>
            <SidebarButton
              iconComponent={
                currentSection === SECTIONS.PROFILE_FORM ||
                (!isMobile && currentSection === SECTIONS.SIDEBAR)
                  ? TaskSquareFilledSvg
                  : TaskSquareSvg
              }
              isActive={
                currentSection === SECTIONS.PROFILE_FORM ||
                (!isMobile && currentSection === SECTIONS.SIDEBAR && (
                  <ProfileForm />
                ))
              }
              onClick={() => setCurrentSection(SECTIONS.PROFILE_FORM)}>
              Загальна інформація
            </SidebarButton>
            <SidebarButton
              iconComponent={
                currentSection === SECTIONS.PASSWORD_FORM
                  ? KeyFilledSvg
                  : KeySvg
              }
              isActive={currentSection === SECTIONS.PASSWORD_FORM}
              onClick={() => setCurrentSection(SECTIONS.PASSWORD_FORM)}>
              Пароль
            </SidebarButton>
          </SettingsSidebar>
        )}
        {(currentSection === SECTIONS.PROFILE_FORM ||
          (!isMobile && currentSection === SECTIONS.SIDEBAR)) && (
          <ProfileForm />
        )}
        {currentSection === SECTIONS.PASSWORD_FORM && <ChangePasswordForm />}
      </div>
    </main>
  );
}
