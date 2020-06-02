import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Responsive, Visibility, Segment } from 'semantic-ui-react'
import NavigationBar from './NavigationBar'
import Heading from './Heading'
import Layout from './Layout'
import { RootState } from '../store'
import { boundSetLang } from '../store/system/actions'
import { bindActionCreators, Dispatch } from 'redux'
import { boundLogin, boundLogout } from '../store/auth/actions'
import { isAppUserSelector, isLoggedInSelector } from '../store/auth/selectors'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

type HomeProps = ConnectedProps<typeof connector> & {
  mobile: boolean
}

const Home: React.FC<HomeProps> = ({ 
  system,
  isLoggedIn, 
  isAppUser, 
  setLang,
  login,
  logout,
  mobile
}: HomeProps) => {
  const [fixed, setFixed] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <React.Fragment>
      <Responsive>
        <Visibility
          once={false}
          onBottomPassed={() => setFixed(true)}
          onBottomPassedReverse={() => setFixed(false)}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: mobile ? 400 : 700, padding: '1em 0em' }}
            vertical
          >
            <NavigationBar fixed={fixed}
              lang={system.lang}
              isLoggedIn={isLoggedIn}
              isAppUser={isAppUser}
              setLang={setLang}
              logout={logout}
              setLoginModalOpen={setLoginModalOpen}
              setRegisterModalOpen={setRegisterModalOpen}
            />
            <Heading mobile={mobile}
              isLoggedIn={isLoggedIn}
              isAppUser={isAppUser}
              setRegisterModalOpen={setRegisterModalOpen}
            />
          </Segment>
        </Visibility>

        <Layout isLoggedIn={isLoggedIn}
          isAppUser={isAppUser}
          setRegisterModalOpen={setRegisterModalOpen}
        />
      </Responsive>

      <LoginModal open={loginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
        login={login}
      />
      <RegisterModal open={registerModalOpen}
        closeModal={() => setRegisterModalOpen(false)}
      />
    </React.Fragment>
  )
}

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  isLoggedIn: isLoggedInSelector(state),
  isAppUser: isAppUserSelector(state)
})
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    setLang: boundSetLang,
    login: boundLogin,
    logout: boundLogout
  }, dispatch)
}
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Home)