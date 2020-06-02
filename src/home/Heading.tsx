import React from 'react'
import { Container, Header, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import routes from '../routes'
import i18n from '../localization/i18n'

type HeadingProps = {
  mobile: boolean
  isLoggedIn: boolean
  isAppUser: boolean
  setRegisterModalOpen(state: boolean): void
}

const Heading: React.FC<HeadingProps> = ({ 
  mobile,
  isLoggedIn,
  isAppUser,
  setRegisterModalOpen
}: HeadingProps) => {
  return (
    <Container text>
      <Header
        as='h1'
        content={i18n.t('Fitness Calculator')}
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
        content={i18n.t('Take control over your weight.')}
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      
      {(isLoggedIn && isAppUser) ? (
        <Button primary
          size='huge'
          as={Link}
          to={routes.app.index}
        >
          {i18n.t('Get Started')}
          <Icon name='arrow right' />
        </Button>
      ) : (
        <Button primary
          size='huge'
          onClick={() => setRegisterModalOpen(true)}
        >
          {i18n.t('Get Started')}
          <Icon name='arrow right' />
        </Button>
      )}
      
    </Container>
  )
}

export default Heading