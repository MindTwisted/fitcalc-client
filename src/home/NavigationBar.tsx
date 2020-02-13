import React from 'react';
import { Button, Container, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import i18n from '../localization/i18n';
import logo from '../logo.svg';
import { AuthState } from '../store/auth/types';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';
import { boundSetLang, boundSetLoading } from '../store/system/actions';
import { deleteRefreshTokenById } from '../api/refresh_tokens';

type NavigationBarProps = {
  fixed: boolean,
  auth: AuthState,
  lang: string,
  isLoggedIn: boolean,
  isAppUser: boolean,
  setLang: typeof boundSetLang,
  setAccessToken: typeof boundSetAccessToken,
  setRefreshToken: typeof boundSetRefreshToken,
  setUser: typeof boundSetUser,
  setLoading: typeof boundSetLoading,
  setLoginModalOpen(state: boolean): void,
  setRegisterModalOpen(state: boolean): void
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  fixed, 
  auth,
  lang,
  isLoggedIn, 
  isAppUser,
  setLang, 
  setAccessToken, 
  setRefreshToken, 
  setUser,
  setLoading,
  setLoginModalOpen,
  setRegisterModalOpen
}: NavigationBarProps) => {
  const langOptions = [
    {
      text: i18n.t('English', { lng: lang }),
      value: 'en'
    },
    {
      text: i18n.t('Russian', { lng: lang }),
      value: 'ru'
    }
  ];

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
          options={langOptions}
          defaultValue={lang}
          onChange={(e, { value }) => setLang(String(value))}
        />

        <Menu.Item position='right'>

          {(isLoggedIn && isAppUser) && (
            <Menu.Item>
              <Link to={routes.app}>
                {i18n.t('Application', { lng: lang })}
              </Link>
            </Menu.Item>
          )}

          {isLoggedIn ? (
            <Button as='a'
              inverted={!fixed}
              onClick={handleLogout}
            >
              {i18n.t('Logout', { lng: lang })}
            </Button>
          ) : (
            <React.Fragment>
              <Button as='a'
                inverted={!fixed}
                onClick={() => setLoginModalOpen(true)}
              >
                {i18n.t('Log In', { lng: lang })}
              </Button>

              <Button as='a'
                inverted={!fixed}
                primary={fixed}
                style={{ marginLeft: '0.5em' }}
                onClick={() => setRegisterModalOpen(true)}
              >
                {i18n.t('Sign Up', { lng: lang })}
              </Button>
            </React.Fragment>
          )}

        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavigationBar;