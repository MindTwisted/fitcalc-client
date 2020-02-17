import React from 'react';
import { Icon, Menu, Sidebar, Sticky } from 'semantic-ui-react';
import i18n from '../localization/i18n';

type SidebarNavigationProps = {
  lang: string,
  mobile: boolean,
  visible: boolean,
  setVisible: (visible: boolean) => void
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  lang,
  mobile,
  visible,
  setVisible
}: SidebarNavigationProps) => {
  return (
    <Sticky>
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
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