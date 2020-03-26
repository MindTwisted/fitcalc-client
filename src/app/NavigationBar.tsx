import React from 'react';
import { Divider, Dropdown, Icon, Menu, Sticky } from 'semantic-ui-react';
import i18n from '../localization/i18n';
import { User } from '../types/models';
import { boundLogout } from '../store/auth/actions';
import { Themes } from '../types/models';

type NavigationBarProps = {
  sidebarVisible: boolean;
  setSidebarVisible: (visible: boolean) => void;
  mobile: boolean;
  user: User;
  logout: typeof boundLogout;
  theme: Themes;
  setSettingsModalOpen: (open: boolean) => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  sidebarVisible, 
  setSidebarVisible ,
  mobile,
  user,
  logout,
  theme,
  setSettingsModalOpen
}: NavigationBarProps) => {
  return (
    <Sticky>
      <Menu borderless
        inverted={theme !== Themes.Light}
        size='large'
        style={{ borderRadius: 0 }}
      >
        {mobile && (
          <Menu.Item onClick={() => setSidebarVisible(!sidebarVisible)}>
            <Icon name='bars' />
          </Menu.Item>
        )}
        
        <Menu.Menu position='right'>

          <Dropdown item
            as='a'
            text={mobile ? '' : user.name}
            icon={mobile ? <Icon name='user' /> : null}
          >
            <Dropdown.Menu>
              <Dropdown.Item icon={<Icon name='setting' />}
                text={i18n.t('Settings')}
                onClick={() => setSettingsModalOpen(true)}
              />
              <Divider />
              <Dropdown.Item onClick={logout}
                icon={<Icon name='sign-out' />}
                text={i18n.t('Logout')}
              />
            </Dropdown.Menu>
          </Dropdown>

        </Menu.Menu>
      </Menu>
    </Sticky>
  );
};

export default NavigationBar;