import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Register } from './page';
import EmailLogin from './containers/auth/EmailLogin';
import Core from './containers/base/Core';
import MakePin from './containers/pin/MakePin';
import SidebarContainer from './containers/base/SidebarContainer';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/email-register' component={Register} />
        <Route exact path='/email-login' component={EmailLogin} />
      </Switch>
      <Core />
      <MakePin />
      <SidebarContainer />
    </React.Fragment>
  );
}
export default App;

/*
      <Route exact path='/' component={Home}/>
      <Route path='/(tags|users)' component={Home} />
      <Route exact path='/email-register' component={Register} />
      <Route exact path='/email-login' component={EmailLogin} />
      <Route exact path='/@:displayName/' component={User} />
      <Route exact path='/@:displayName/(pin|following|follower|saves)' component={User} />
      <Route exact path='/pin/:id' component={Pin}/>
      <Core />

*/