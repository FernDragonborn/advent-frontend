'use client';

import { useState } from 'react';

import { ConfirmPopup, SidebarButton } from '@/components';
import { KeySvg, LogoutSvg } from '@/svgs';
import styles from '@/styles/components/sidebars/SettingsSidebar.module.scss';

const SettingsSidebar = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <aside className={styles.wrapper}>
      {children}
      <SidebarButton
        iconComponent={true ? LogoutSvg : KeySvg}
        onClick={() => setIsLogoutModalOpen(true)}>
        Вийти з акаунту
      </SidebarButton>

      <ConfirmPopup
        title="Вийти з системи"
        question="Ви впевнені, що хочете вийти з системи?"
        submitBtnLabel="Вийти"
        isOpen={isLogoutModalOpen}
        onSubmit={() => setIsLogoutModalOpen(false)}
        onHide={() => setIsLogoutModalOpen(false)}
      />
    </aside>
  );
};

export default SettingsSidebar;
