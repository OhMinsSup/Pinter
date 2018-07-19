import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, Register } from './page';
import EmailLogin from './containers/landing/EmailLoginContainer';
import Core from './containers/base/Core';

const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home}/>
      <Route exact path='/email-register' component={Register} />
      <Route exact path='/email-login' component={EmailLogin} />
      <Core />
    </React.Fragment>
  );
}
export default App;

