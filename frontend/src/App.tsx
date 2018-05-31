import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Register } from './page';
import Core from './containers/base/Core';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact={true} pate="/" component={Home} />
        <Route pate="/register" component={Register} />
      </Switch>
      <Core />
    </React.Fragment>
  );
}

export default App;

