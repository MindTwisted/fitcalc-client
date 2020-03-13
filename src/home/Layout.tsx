import React from 'react';
import { Segment, Grid, Header, Button, Image, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import i18n from '../localization/i18n';

type LayoutProps = {
  isLoggedIn: boolean,
  isAppUser: boolean,
  setRegisterModalOpen(state: boolean): void
}

const Layout: React.FC<LayoutProps> = ({
  isLoggedIn,
  isAppUser,
  setRegisterModalOpen
}: LayoutProps) => {
  return (
    <React.Fragment>
      <Segment style={{ padding: '8em 0em' }}
        vertical
      >
        <Grid container
          stackable
          verticalAlign='middle'
        >
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3'
                style={{ fontSize: '2em' }}
              >
                {i18n.t('Most Complete Product Database')}
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {i18n.t('We provide access to a complete database of products checked by our moderators.')}
              </p>
              <Header as='h3'
                style={{ fontSize: '2em' }}
              >
                {i18n.t('Most Full Statistic')}
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {i18n.t('We provide you with all the information you need to analyze and adjust your diet.')}
              </p>
            </Grid.Column>
            <Grid.Column floated='right'
              width={6}
            >
              <Image bordered
                rounded
                centered
                size='large'
                src='/images/diet.jpg'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              {(isLoggedIn && isAppUser) ? (
                <Button size='huge'
                  as={Link}
                  to={routes.app.index}
                >
                  {i18n.t('Check It Out')}
                </Button>
              ) : (
                <Button size='huge'
                  onClick={() => setRegisterModalOpen(true)}
                >
                  {i18n.t('Check It Out')}
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }}
        vertical
      >
        <Grid celled='internally'
          columns='equal'
          stackable
        >
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3'
                style={{ fontSize: '2em' }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                "{i18n.t('Great application')}"
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {i18n.t('That is what our users say')}
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3'
                style={{ fontSize: '2em' }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                "{i18n.t('It has helped me to become fit.')}"
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                {i18n.t('Eugene, fitness newcomer')}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }}
        vertical
      >
        <Container text>
          <Header as='h3'
            style={{ fontSize: '2em' }}
          >
            {i18n.t('Stop Thinking, Start Doing')}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            {i18n.t('Instead of putting off the problem for tomorrow just start now.')}
          </p>
          
          {(isLoggedIn && isAppUser) ? (
            <Button as={Link}
              to={routes.app.index}
              size='large'
            >
              {i18n.t('Give A Try')}
            </Button>
          ) : (
            <Button size='large'
              onClick={() => setRegisterModalOpen(true)}
            >
              {i18n.t('Give A Try')}
            </Button>
          )}
          
        </Container>
      </Segment>

      <Segment inverted
        vertical
        style={{ padding: '5em 0em' }}
      >
        <Container>
          <Header as='h4'
            inverted
          >
            {i18n.t('Fitness Calculator')}
          </Header>
          <p>
            {i18n.t('We give you a tool so you can change your life.')}
          </p>
        </Container>
      </Segment>
    </React.Fragment>
  );
};

export default Layout;