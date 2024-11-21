import { SidebarButton } from '@/components';
import { KeySvg, LogoutSvg } from '@/svgs';
import styles from '@/styles/components/sidebars/SettingsSidebar.module.scss';

const SettingsSidebar = ({ children }) => {
  return (
    <aside className={styles.wrapper}>
      {children}

      <SidebarButton iconComponent={true ? LogoutSvg : KeySvg}>
        Вийти з акаунту
      </SidebarButton>
    </aside>
  );
};

export default SettingsSidebar;
