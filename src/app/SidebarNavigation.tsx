import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Sidebar, Sticky } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import routes from '../routes';
import { Themes } from '../types/models';

type SidebarNavigationProps = {
  theme: Themes;
  mobile: boolean;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  theme,
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
        inverted={theme !== Themes.Light}
        vertical
        visible={visible}
        width='thin'
        onHide={mobile ? (() => setVisible(false)) : undefined}
        style={{ paddingTop: '5em' }}
      >

        <Menu.Item as={NavLink}
          to={routes.app.index}
          exact
        >
          <Icon name='pie graph' />
          {i18n.t('Statistics')}
        </Menu.Item>
        <Menu.Item as={NavLink}
          to={routes.app.products}
        >
          <Icon name='shopping basket' />
          {i18n.t('Products')}
        </Menu.Item>
        <Menu.Item as={NavLink}
          to={routes.app.eating}
        >
          <Icon name='food' />
          {i18n.t('Eating')}
        </Menu.Item>

      </Sidebar>
    </Sticky>
  );
};

export default SidebarNavigation;