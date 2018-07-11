import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, Register } from './page';
/*
import { Route } from 'react-router-dom';
import { Home, Register } from './page';
import EmailLogin from './containers/landing/EmailLoginContainer';
import Core from './containers/base/Core';
/*
const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home}/>
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={EmailLogin} />
      <Core />
    </React.Fragment>
  );
}
*/

const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home}/>
      <Route exact path='/email-register' component={Register} />
    </React.Fragment>
  );
}
export default App;

