import React, { useState } from 'react';
import { Button, Container, Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import i18n from '../localization/i18n';
import logo from '../logo.svg';
import RegisterModal from './RegisterModal';

type NavigationBarProps = {
  fixed: boolean,
  lang: string,
  handleLangChange: Function
}

const NavigationBar: React.FC<NavigationBarProps> = ({ fixed, lang, handleLangChange }: NavigationBarProps) => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  
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

  return (
    <React.Fragment>
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
            onChange={(e, { value }) => handleLangChange(value)}
          />

          <Menu.Item position='right'>
            <Menu.Item>
              <Link to={routes.app}>
                {i18n.t('Application', { lng: lang })}
              </Link>
            </Menu.Item>
            <Button as='a'
              inverted={!fixed}
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
          </Menu.Item>
        </Container>
      </Menu>

      <RegisterModal lang={lang}
        open={registerModalOpen}
        closeModal={() => setRegisterModalOpen(false)}
      />
    </React.Fragment>
  );
};

export default NavigationBar;