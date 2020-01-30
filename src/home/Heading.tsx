import React from "react";
import { Container, Header, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import routes from "../routes";

type HeadingProps = {
    mobile: boolean
};

const Heading: React.FC<HeadingProps> = ({ mobile }: HeadingProps) => {
  return (
    <Container text>
      <Header
        as='h1'
        content='Fitness Calculator'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Take control over your weight.'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button primary
        size='huge'
        as={Link}
        to={routes.app}
      >
          Get Started
        <Icon name='arrow right' />
      </Button>
    </Container>
  );
};

export default Heading;