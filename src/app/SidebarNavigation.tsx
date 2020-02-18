import React from 'react';
import { Icon, Menu, Sidebar, Sticky } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { SystemState, Themes } from '../store/system/types';

type SidebarNavigationProps = {
  system: SystemState,
  mobile: boolean,
  visible: boolean,
  setVisible: (visible: boolean) => void
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  system,
  mobile,
  visible,
  setVisible
}: SidebarNavigationProps) => {
  const { lang, theme } = system;
  
  return (
    <Sticky>
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted={theme !== Themes.Light}
        vertical
        visible={visible}
        width='thin'
        onHide={mobile ? (() => setVisible(false)) : undefined}
        style={{ paddingTop: '5em' }}
      >

        <Menu.Item as='a'
          active
        >
          <Icon name='pie graph' />
          {i18n.t('Statistics', { lng: lang })}
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='shopping basket' />
          {i18n.t('Products', { lng: lang })}
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='food' />
          {i18n.t('Eating', { lng: lang })}
        </Menu.Item>

      </Sidebar>
    </Sticky>
  );
};

export default SidebarNavigation;