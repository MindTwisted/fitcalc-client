import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Image, Segment, Sidebar } from 'semantic-ui-react';
import { RootState } from '../store';
import { boundLogout } from '../store/auth/actions';
import { boundSetLang, boundSetTheme } from '../store/system/actions';
import SidebarNavigation from './SidebarNavigation';
import NavigationBar from './NavigationBar';
import SettingsModal from './SettingsModal';

type ApplicationProps = ConnectedProps<typeof connector> & {
  mobile: boolean
};

const Application: React.FC<ApplicationProps> = ({ 
  system, 
  auth,
  logout,
  setLang,
  setTheme,
  mobile
}: ApplicationProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(!mobile);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    setSidebarVisible(!mobile);
  }, [mobile]);
  
  return (
    <React.Fragment>
      <Sidebar.Pushable style={{ transform: 'none' }}>
        <SidebarNavigation system={system}
          mobile={mobile}
          visible={sidebarVisible}
          setVisible={setSidebarVisible}
        />

        <Sidebar.Pusher dimmed={mobile && sidebarVisible}
          style={{ minHeight: '100vh' }}
        >
          <NavigationBar sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
            mobile={mobile}
            auth={auth}
            logout={logout}
            system={system}
            setSettingsModalOpen={setSettingsModalOpen}
          />

          <Segment basic
            style={mobile ? null : { paddingLeft: 'calc(150px + 1em)' }}
          >
            <Header as='h3'>Application Content</Header>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      
      <SettingsModal system={system}
        user={auth.user}
        open={settingsModalOpen}
        closeModal={() => setSettingsModalOpen(false)}
        setLang={setLang}
        setTheme={setTheme}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  auth: state.auth
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    logout: boundLogout,
    setLang: boundSetLang,
    setTheme: boundSetTheme
  }, dispatch);
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Application);