import React from 'react';
import { Divider, Dropdown, Icon, Menu, Sticky } from 'semantic-ui-react';
import { AuthState } from '../store/auth/types';
import { boundLogout } from '../store/auth/actions';
import i18n from '../localization/i18n';

type NavigationBarProps = {
    sidebarVisible: boolean,
    setSidebarVisible: (visible: boolean) => void,
    mobile: boolean,
    auth: AuthState,
    logout: typeof boundLogout,
    lang: string,
    setSettingsModalOpen: (open: boolean) => void
};

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  sidebarVisible, 
  setSidebarVisible ,
  mobile,
  auth,
  logout,
  lang,
  setSettingsModalOpen
}: NavigationBarProps) => {
  return (
    <Sticky>
      <Menu borderless
        inverted
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
            text={mobile ? '' : auth.user?.name}
            icon={mobile ? <Icon name='user' /> : null}
          >
            <Dropdown.Menu>
              <Dropdown.Item icon={<Icon name='setting' />}
                text={i18n.t('Settings', { lng: lang })}
                onClick={() => setSettingsModalOpen(true)}
              />
              <Divider />
              <Dropdown.Item onClick={logout}
                icon={<Icon name='sign-out' />}
                text={i18n.t('Logout', { lng: lang })}
              />
            </Dropdown.Menu>
          </Dropdown>

        </Menu.Menu>
      </Menu>
    </Sticky>
  );
};

export default NavigationBar;