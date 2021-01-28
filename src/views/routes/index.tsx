import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Chart from '../pages/chart/Chart';

export const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/chart" />
      </Route>
      <Route exact path="/chart" component={Chart} />
      <Route exact path="/songs">
        <h1>Songs</h1>
      </Route>
    </Switch>
  );
};
