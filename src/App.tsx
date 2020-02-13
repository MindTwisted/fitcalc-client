import React from 'react';
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
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact
            path={routes.home}
            component={Home}
          />
          <ProtectedRoute isAllowed={isLoggedIn && isAppUser}
            redirect={routes.home}
            path={routes.app}
            component={Application}
          />
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
