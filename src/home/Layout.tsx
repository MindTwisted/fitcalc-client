import React from "react";
import { Segment, Grid, Header, Button, Image, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Layout: React.FC = () => {
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
                Most Complete Product Database
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We provide access to a complete database of products checked by our moderators.
              </p>
              <Header as='h3'
                style={{ fontSize: '2em' }}
              >
                Most Full Statistic
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We provide you with all the information you need to analyze and adjust your diet.
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
              <Button size='huge'
                as={Link}
                to='/app'
              >
                Check It Out
              </Button>
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
                "Great application"
              </Header>
              <p style={{ fontSize: '1.33em' }}>That is what our users say</p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3'
                style={{ fontSize: '2em' }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                "It has helped me to become fit."
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <b>John</b> Fitness newcomer
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
            Stop Thinking, Start Doing
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Instead of putting off the problem for tomorrow just start now.
          </p>
          <Button as={Link}
            to='/app'
            size='large'
          >
            Give A Try
          </Button>
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
            Fitness Calculator
          </Header>
          <p>
            We give you a tool so you can change your life.
          </p>
        </Container>
      </Segment>
    </React.Fragment>
  );
};

export default Layout;