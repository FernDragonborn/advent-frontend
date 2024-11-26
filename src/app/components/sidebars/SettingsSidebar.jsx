'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import { ConfirmPopup, SidebarButton } from '@/components';
import { LogoutSvg } from '@/svgs';
import { logoutAction } from '@/app/actions';
import { useAuthMutation } from '@/hooks';
import styles from '@/styles/components/sidebars/SettingsSidebar.module.scss';

const SettingsSidebar = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useAuthMutation({
    mutationFn: () =>
      logoutAction().then(() => {
        router.replace('/login');
        queryClient.removeQueries();
      }),
    onSuccess: () => setIsLogoutModalOpen(false),
  });

  return (
    <aside className={styles.wrapper}>
      {children}
      <SidebarButton
        iconComponent={LogoutSvg}
        onClick={() => setIsLogoutModalOpen(true)}>
        Вийти з акаунту
      </SidebarButton>

      <ConfirmPopup
        title="Вийти з системи"
        question="Ви впевнені, що хочете вийти з системи?"
        submitBtnLabel="Вийти"
        isOpen={isLogoutModalOpen}
        onSubmit={() => logoutMutation.mutate()}
        onHide={() => setIsLogoutModalOpen(false)}
      />
    </aside>
  );
};

export default SettingsSidebar;
