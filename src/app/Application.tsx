import React, { useCallback, useEffect, useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Route } from 'react-router-dom';
import { Segment, Sidebar } from 'semantic-ui-react';
import routes from '../routes';
import { RootState } from '../store';
import { boundLogout, boundSetUser, boundSoftLogout } from '../store/auth/actions';
import { boundSetLang, boundSetLoading, boundSetTheme } from '../store/system/actions';
import { auth as fetchAuth } from '../api/auth';
import SidebarNavigation from './SidebarNavigation';
import NavigationBar from './NavigationBar';
import SettingsModal from './SettingsModal';
import StatisticsPage from './StatisticsPage';
import ProductsPage from './ProductsPage';
import EatingPage from './EatingPage';

type ApplicationProps = ConnectedProps<typeof connector> & {
  mobile: boolean;
};

const Application: React.FC<ApplicationProps> = ({ 
  system, 
  auth,
  logout,
  softLogout,
  setLang,
  setTheme,
  setUser,
  setLoading,
  mobile
}: ApplicationProps) => {
  if (!auth.user || !auth.refreshToken || !auth.accessToken) {
    throw new Error('Application component requires logged-in user to work properly.');
  }

  const [sidebarVisible, setSidebarVisible] = useState(!mobile);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);

    try {
      const authResponse = await fetchAuth();
      const { user } = authResponse.data.data;

      setUser(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [setLoading, setUser]);

  useEffect(() => {
    fetchCurrentUser();
    setSidebarVisible(!mobile);
  }, [mobile, fetchCurrentUser]);
  
  const getContentStyles = () => {
    const styles: any = {
      paddingBottom: '5rem'
    };
    
    if (!mobile) {
      styles.paddingLeft = 'calc(150px + 1em)';
    }
    
    return styles;
  };

  return (
    <React.Fragment>
      <Sidebar.Pushable style={{ transform: 'none' }}>
        <SidebarNavigation theme={system.theme}
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
            user={auth.user}
            logout={logout}
            theme={system.theme}
            setSettingsModalOpen={setSettingsModalOpen}
          />

          <Segment basic
            style={getContentStyles()}
          >
            <Route path={routes.app.index}
              exact
            >
              <StatisticsPage />
            </Route>
            <Route path={routes.app.products}>
              <ProductsPage lang={system.lang}
                theme={system.theme}
                setLoading={setLoading}
              />
            </Route>
            <Route path={routes.app.eating}>
              <EatingPage />
            </Route>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      
      <SettingsModal theme={system.theme}
        lang={system.lang}
        user={auth.user}
        refreshToken={auth.refreshToken}
        open={settingsModalOpen}
        closeModal={() => setSettingsModalOpen(false)}
        setLang={setLang}
        setTheme={setTheme}
        setUser={setUser}
        softLogout={softLogout}
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
    softLogout: boundSoftLogout,
    setLang: boundSetLang,
    setTheme: boundSetTheme,
    setUser: boundSetUser,
    setLoading: boundSetLoading
  }, dispatch);
};
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Application);