import React from 'react';
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import i18n from '../localization/i18n';
import logo from '../logo.svg';
import { boundLogout } from '../store/auth/actions';
import { boundSetLang } from '../store/system/actions';
import { Languages } from '../store/system/types';

type NavigationBarProps = {
  fixed: boolean,
  lang: Languages,
  isLoggedIn: boolean,
  isAppUser: boolean,
  setLang: typeof boundSetLang,
  logout: typeof boundLogout,
  setLoginModalOpen(state: boolean): void,
  setRegisterModalOpen(state: boolean): void
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  fixed,
  lang,
  isLoggedIn, 
  isAppUser,
  setLang,
  logout,
  setLoginModalOpen,
  setRegisterModalOpen
}: NavigationBarProps) => {
  return (
    <Menu
      fixed={fixed ? 'top' : undefined}
      inverted={!fixed}
      pointing={!fixed}
      secondary={!fixed}
      size='large'
    >
      <Container>
        <Menu.Item>
          <img src={logo}
            alt='Logo'
          />
        </Menu.Item>
        <Dropdown item
          options={[
            {
              text: i18n.t('English'),
              value: Languages.English
            },
            {
              text: i18n.t('Russian'),
              value: Languages.Russian
            }
          ]}
          defaultValue={lang}
          onChange={(e, { value }) => setLang(value as Languages)}
        />

        <Menu.Item position='right'>

          {(isLoggedIn && isAppUser) && (
            <Menu.Item>
              <Link to={routes.app}>
                {i18n.t('Application')}
              </Link>
            </Menu.Item>
          )}

          {isLoggedIn ? (
            <Button as='a'
              inverted={!fixed}
              onClick={logout}
            >
              {i18n.t('Logout')}
            </Button>
          ) : (
            <React.Fragment>
              <Button as='a'
                inverted={!fixed}
                onClick={() => setLoginModalOpen(true)}
              >
                {i18n.t('Log In')}
              </Button>

              <Button as='a'
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: '0.5em' }}
                onClick={() => setRegisterModalOpen(true)}
              >
                {i18n.t('Sign Up')}
              </Button>
            </React.Fragment>
          )}

        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavigationBar;