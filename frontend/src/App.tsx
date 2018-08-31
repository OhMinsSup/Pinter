import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Register, Pin, NotFound, User } from './page';
import EmailLogin from './containers/auth/EmailLogin';
import Core from './containers/base/Core';
import MakePin from './containers/pin/MakePin';
import SidebarContainer from './containers/base/SidebarContainer';
import GalleryContainer from './containers/common/GalleryContainer';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/email-register' component={Register} />
        <Route exact path='/email-login' component={EmailLogin} />
        <Route exact path='/pin/:id' component={Pin} />
        <Route exact path='/@:displayName' component={User} />
        <Route component={NotFound} />
      </Switch>
      <Core />
      <MakePin />
      <SidebarContainer />
      <GalleryContainer />
    </React.Fragment>
  );
}
export default App;
