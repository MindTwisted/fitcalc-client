import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import routes from './routes';
import Home from './home/Home';
import Loading from './common/Loading';
import Notification from './common/Notification';

const Application = loadable(() => import('./app/Application'), {
  fallback: <Loading />
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact
            path={routes.home}
          >
            <Home />
          </Route>
          <Route path={routes.app}>
            <Application />
          </Route>
        </Switch>
      </Router>

      <Notification />
    </div>
  );
};

export default App;
