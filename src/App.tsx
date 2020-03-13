import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import routes from './routes';
import Home from './home/Home';
import Loading from './common/Loading';
import Notification from './common/Notification';
import ProtectedRoute from './common/ProtectedRoute';
import { RootState } from './store';
import { isAppUserSelector, isLoggedInSelector } from './store/auth/selectors';
import { connect, ConnectedProps } from 'react-redux';

const Application = loadable(() => import('./app/Application'), {
  fallback: <Loading active={true} />
});

type AppProps = ConnectedProps<typeof connector>;

const App: React.FC<AppProps> = ({ system, isLoggedIn, isAppUser }: AppProps) => {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  
  const handleResize = () => {
    setMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact
            path={routes.home.index}
          >
            <Home mobile={mobile} />
          </Route>
          <ProtectedRoute isAllowed={isLoggedIn && isAppUser}
            redirect={routes.home.index}
            path={routes.app.index}
          >
            <Application mobile={mobile} />
          </ProtectedRoute>
        </Switch>
      </Router>

      <Notification />
      <Loading active={system.loading} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  system: state.system,
  isLoggedIn: isLoggedInSelector(state),
  isAppUser: isAppUserSelector(state)
});
const connector = connect(mapStateToProps);

export default connector(App);
