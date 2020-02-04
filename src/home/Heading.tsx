import React from "react";
import { Container, Header, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import routes from "../routes";
import i18n from '../localization/i18n';

type HeadingProps = {
    mobile: boolean,
    lang: string
};

const Heading: React.FC<HeadingProps> = ({ mobile, lang }: HeadingProps) => {
  return (
    <Container text>
      <Header
        as='h1'
        content={i18n.t('Fitness Calculator', { lng: lang })}
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
        content={i18n.t('Take control over your weight.', { lng: lang })}
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
        {i18n.t('Get Started', { lng: lang })}
        <Icon name='arrow right' />
      </Button>
    </Container>
  );
};

export default Heading;