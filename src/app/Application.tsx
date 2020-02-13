import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Image, Segment, Sidebar } from 'semantic-ui-react';
import { RootState } from '../store';
import { boundSetLang, boundSetLoading } from '../store/system/actions';
import { boundSetAccessToken, boundSetRefreshToken, boundSetUser } from '../store/auth/actions';
import SidebarNavigation from './SidebarNavigation';

type ApplicationProps = ConnectedProps<typeof connector>;

const Application: React.FC<ApplicationProps> = ({ 
  system, 
  auth, 
  setLang, 
  setAccessToken, 
  setRefreshToken, 
  setUser, 
  setLoading 
}: ApplicationProps) => {
  return (
    <Sidebar.Pushable style={{ minHeight: '100vh' }}>
      <SidebarNavigation lang={system.lang}
        auth={auth}
        setLoading={setLoading}
        setAccessToken={setAccessToken}
        setRefreshToken={setRefreshToken}
        setUser={setUser}
        setLang={setLang}
      />

      <Sidebar.Pusher>
        <Segment basic>
          <Header as='h3'>Application Content</Header>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  auth: state.auth
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

export default connector(Application);