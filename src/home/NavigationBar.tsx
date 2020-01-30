import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import routes from "../routes";
import logo from '../logo.svg';

type NavigationBarProps = {
    fixed: boolean
}

const NavigationBar: React.FC<NavigationBarProps> = ({ fixed }: NavigationBarProps) => {
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