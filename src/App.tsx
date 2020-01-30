import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from "@loadable/component";
import Home from "./home/Home";
import Loading from "./common/Loading";

const Application = loadable(() => import("./app/Application"), {
  fallback: <Loading />
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact
            path="/"
          >
            <Home />
          </Route>
          <Route path="/app">
            <Application />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
