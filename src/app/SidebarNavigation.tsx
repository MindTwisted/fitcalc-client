import React from 'react';
import { Divider, Icon, Menu, Sidebar } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { AuthState } from '../store/auth/types';
import { boundLogout } from '../store/auth/actions';

type SidebarNavigationProps = {
  lang: string,
  auth: AuthState,
  logout: typeof boundLogout,
  mobile: boolean
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  lang,
  auth,
  logout,
  mobile
}: SidebarNavigationProps) => {
  return (
    <Sidebar
      as={Menu}
      animation='push'
      icon={mobile ? true : 'labeled'}
      inverted
      vertical
      visible
      width={mobile ? 'very thin' : 'thin'}
    >

      <Menu.Item as='a'>
        <Icon name='user' />
        {!mobile && auth.user?.name}
      </Menu.Item>

      <Divider inverted
        section
      />
      
      <Menu.Item as='a'
        active
      >
        <Icon name='pie graph' />
        {!mobile && 'Stats'}
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='shopping basket' />
        {!mobile && 'Products'}
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='food' />
        {!mobile && 'Eating'}
      </Menu.Item>

      <Divider inverted
        section
      />

      <Menu.Item as='a'
        onClick={logout}
      >
        <Icon name='shutdown' />
        {!mobile && i18n.t('Logout', { lng: lang })}
      </Menu.Item>
    </Sidebar>
  );
};

export default SidebarNavigation;