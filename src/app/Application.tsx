import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Header, Image, Segment, Sidebar } from 'semantic-ui-react';
import { RootState } from '../store';
import { boundLogout } from '../store/auth/actions';
import SidebarNavigation from './SidebarNavigation';

type ApplicationProps = ConnectedProps<typeof connector> & {
  mobile: boolean
};

const Application: React.FC<ApplicationProps> = ({ 
  system, 
  auth,
  logout,
  mobile
}: ApplicationProps) => {
  return (
    <Sidebar.Pushable style={{ minHeight: '100vh' }}>
      <SidebarNavigation lang={system.lang}
        auth={auth}
        logout={logout}
        mobile={mobile}
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
    logout: boundLogout
  }, dispatch)
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Application);