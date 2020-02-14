import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Responsive, Visibility, Segment } from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import Heading from './Heading';
import Layout from './Layout';
import { RootState } from '../store';
import { boundSetLang, boundSetLoading } from '../store/system/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';
import { isAppUserSelector, isLoggedInSelector } from '../store/auth/selectors';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

type HomeProps = ConnectedProps<typeof connector> & {
  mobile: boolean
};

const Home: React.FC<HomeProps> = ({ 
  system, 
  auth,
  isLoggedIn, 
  isAppUser, 
  setLang, 
  setAccessToken, 
  setRefreshToken, 
  setUser,
  setLoading,
  mobile
}: HomeProps) => {
  const [fixed, setFixed] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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
              auth={auth}
              lang={system.lang}
              isLoggedIn={isLoggedIn}
              isAppUser={isAppUser}
              setLang={setLang}
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              setUser={setUser}
              setLoading={setLoading}
              setLoginModalOpen={setLoginModalOpen}
              setRegisterModalOpen={setRegisterModalOpen}
            />
            <Heading mobile={mobile}
              lang={system.lang}
              isLoggedIn={isLoggedIn}
              isAppUser={isAppUser}
              setRegisterModalOpen={setRegisterModalOpen}
            />
          </Segment>
        </Visibility>

        <Layout lang={system.lang}
          isLoggedIn={isLoggedIn}
          isAppUser={isAppUser}
          setRegisterModalOpen={setRegisterModalOpen}
        />
      </Responsive>

      <LoginModal lang={system.lang}
        open={loginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
        setAccessToken={setAccessToken}
        setRefreshToken={setRefreshToken}
        setUser={setUser}
      />
      <RegisterModal lang={system.lang}
        open={registerModalOpen}
        closeModal={() => setRegisterModalOpen(false)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  auth: state.auth,
  isLoggedIn: isLoggedInSelector(state),
  isAppUser: isAppUserSelector(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    setLang: boundSetLang,
    setAccessToken: boundSetAccessToken,
    setRefreshToken: boundSetRefreshToken,
    setUser: boundSetUser,
    setLoading: boundSetLoading
  }, dispatch)
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Home);