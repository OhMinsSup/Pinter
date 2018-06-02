import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, Register } from './page';
import Core from './containers/base/Core';

const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home}/>
      <Route exact path='/register' component={Register} />
      <Core />
    </React.Fragment>
  );
}

export default App;

