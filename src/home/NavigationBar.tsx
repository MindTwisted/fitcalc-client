import React from 'react'
import { Container, Divider, Dropdown, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import routes from '../routes'
import i18n from '../localization/i18n'
import logo from '../logo.svg'
import { boundLogout } from '../store/auth/actions'
import { boundSetLang } from '../store/system/actions'
import { Languages } from '../types/models'

type NavigationBarProps = {
  fixed: boolean
  lang: Languages
  mobile: boolean
  isLoggedIn: boolean
  isAppUser: boolean
  setLang: typeof boundSetLang
  logout: typeof boundLogout
  setLoginModalOpen(state: boolean): void
  setRegisterModalOpen(state: boolean): void
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  fixed,
  lang,
  mobile,
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
            alt='FitCalc'
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

        {!mobile ? (
          <Menu.Item position='right'>

            {(isLoggedIn && isAppUser) && (
              <Menu.Item as={Link}
                to={routes.app.index}
                content={i18n.t('Application')}
              />
            )}

            {isLoggedIn ? (
              <Menu.Item onClick={logout}
                content={i18n.t('Logout')}
              />
            ) : (
              <React.Fragment>
                <Menu.Item onClick={() => setLoginModalOpen(true)}
                  content={i18n.t('Log In')}
                />
                <Menu.Item onClick={() => setRegisterModalOpen(true)}
                  content={i18n.t('Sign Up')}
                />
              </React.Fragment>
            )}

          </Menu.Item>
        ) : (
          <Menu.Menu position='right'>

            <Dropdown item
              icon={<Icon name='bars' />}
            >
              <Dropdown.Menu as={Menu}
                vertical
                style={{ width: '100vw' }}
              >
                {(isLoggedIn && isAppUser) && (
                  <Dropdown.Item as={Link}
                    to={routes.app.index}
                    text={i18n.t('Application')}
                    icon={<Icon name='server' />}
                  />
                )}

                {isLoggedIn ? (
                  <React.Fragment>
                    <Divider />
                    <Dropdown.Item onClick={logout}
                      text={i18n.t('Logout')}
                      icon={<Icon name='sign-out' />}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Dropdown.Item onClick={() => setLoginModalOpen(true)}
                      text={i18n.t('Log In')}
                    />
                    <Dropdown.Item onClick={() => setRegisterModalOpen(true)}
                      text={i18n.t('Sign Up')}
                    />
                  </React.Fragment>
                )}
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
        )}
      </Container>
    </Menu>
  )
}

export default NavigationBar