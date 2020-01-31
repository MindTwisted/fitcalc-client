import React from "react";
import { Button, Container, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import routes from "../routes";
import logo from '../logo.svg';

type NavigationBarProps = {
  fixed: boolean,
  lang: string,
  handleLangChange: Function
}

const langOptions = [
  {
    text: 'English',
    value: 'en'
  },
  {
    text: 'Russian',
    value: 'ru'
  }
];

const NavigationBar: React.FC<NavigationBarProps> = ({ fixed, lang, handleLangChange }: NavigationBarProps) => {
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
          onChange={(e, { value }) => handleLangChange(value)}
        />

        <Menu.Item position='right'>
          <Menu.Item>
            <Link to={routes.app}>Application</Link>
          </Menu.Item>
          <Button as='a'
            inverted={!fixed}
          >
            Log in
          </Button>
          <Button as='a'
            inverted={!fixed}
            primary={fixed}
            style={{ marginLeft: '0.5em' }}
          >
            Sign Up
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavigationBar;