import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, Register, User } from './page';
import EmailLogin from './containers/landing/EmailLoginContainer';
import Core from './containers/base/Core';
import PinViewer from './containers/pin/PinViewer';

const App = () => {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home}/>
      <Route exact path='/tags/:tag?' component={Home} />
      <Route exact path='/email-register' component={Register} />
      <Route exact path='/email-login' component={EmailLogin} />
      <Route exact path='/@:displayName/' component={User} />
      <Route exact path='/@:displayName/(pin|following|follower|board|saves)' component={User} />
      <Core />
      <PinViewer />
    </React.Fragment>
  );
}
export default App;

