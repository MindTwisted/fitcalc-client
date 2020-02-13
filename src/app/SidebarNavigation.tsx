import React from 'react';
import { Divider, Icon, Menu, Sidebar } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { deleteRefreshTokenById } from '../api/refresh_tokens';
import { AuthState } from '../store/auth/types';
import { boundSetLang, boundSetLoading } from '../store/system/actions';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';

type SidebarNavigationProps = {
  lang: string,
  auth: AuthState,
  setLoading: typeof boundSetLoading,
  setAccessToken: typeof boundSetAccessToken,
  setRefreshToken: typeof boundSetRefreshToken,
  setUser: typeof boundSetUser,
  setLang: typeof boundSetLang
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  lang,
  auth,
  setLoading,
  setAccessToken,
  setRefreshToken,
  setUser,
  setLang
}: SidebarNavigationProps) => {
  const handleLogout = async () => {
    setLoading(true);

    try {
      if (auth.refreshToken?.id) {
        await deleteRefreshTokenById(auth.refreshToken.id);
      }

      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  
  return (
    <Sidebar
      as={Menu}
      animation='push'
      icon='labeled'
      inverted
      vertical
      visible
      width='thin'
    >

      <Menu.Item as='a'>
        <Icon name='user' />
        {auth.user?.name}
      </Menu.Item>

      <Divider inverted
        section
      />
      
      <Menu.Item as='a'
        active
      >
        <Icon name='pie graph' />
          Stats
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='shopping basket' />
          Products
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='food' />
          Eating
      </Menu.Item>

      <Divider inverted
        section
      />

      <Menu.Item as='a'
        onClick={handleLogout}
      >
        <Icon name='shutdown' />
        {i18n.t('Logout', { lng: lang })}
      </Menu.Item>
    </Sidebar>
  );
};

export default SidebarNavigation;