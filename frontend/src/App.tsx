import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Register, Pin } from './page';
import EmailLogin from './containers/auth/EmailLogin';
import Core from './containers/base/Core';
import MakePin from './containers/pin/MakePin';
import SidebarContainer from './containers/base/SidebarContainer';
import FullScreenImageContainer from './containers/common/FullScreenImageContainer';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/email-register' component={Register} />
        <Route exact path='/email-login' component={EmailLogin} />
        <Route exact path='/pin/:id' component={Pin} />
      </Switch>
      <Core />
      <MakePin />
      <SidebarContainer />
      <FullScreenImageContainer />
    </React.Fragment>
  );
}
export default App;
