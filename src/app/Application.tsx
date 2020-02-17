import React, { useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Image, Segment, Sidebar } from 'semantic-ui-react';
import { RootState } from '../store';
import { boundLogout } from '../store/auth/actions';
import SidebarNavigation from './SidebarNavigation';
import NavigationBar from './NavigationBar';

type ApplicationProps = ConnectedProps<typeof connector> & {
  mobile: boolean
};

const Application: React.FC<ApplicationProps> = ({ 
  system, 
  auth,
  logout,
  mobile
}: ApplicationProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(!mobile);

  useEffect(() => {
    setSidebarVisible(!mobile);
  }, [mobile]);
  
  return (
    <Sidebar.Pushable style={{ transform: 'none' }}>
      <SidebarNavigation lang={system.lang}
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
          lang={system.lang}
        />
        
        <Segment basic
          style={mobile ? null : { paddingLeft: 'calc(150px + 1em)' }}
        >
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
    logout: boundLogout
  }, dispatch)
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Application);