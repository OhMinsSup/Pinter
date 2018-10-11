import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Register, Pin, NotFound, User, Write, Search } from './page';
import EmailLogin from './containers/auth/EmailLogin';
import Core from './containers/base/Core';
import SidebarContainer from './containers/base/SidebarContainer';
import GalleryContainer from './containers/common/GalleryContainer';
import NoticeModalContainer from './containers/common/NoticeMobalContainer';
import MakePinGroupContainer from './containers/common/MakePinGroupContainer';

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path='/(recent|tags|users)/:tag?' component={Home} />
        <Route exact path='/email-register' component={Register} />
        <Route exact path='/email-login' component={EmailLogin} />
        <Route exact path='/write' component={Write} />
        <Route exact path='/pin/:id' component={Pin} />
        <Route exact path="/search/(pin|user)?" component={Search} />
        <Route exact path='/@:displayName' component={User} />
        <Route exact path="/@:displayName/(pin|locker|group)" component={User} />
        <Route component={NotFound} />
      </Switch>
      <Core />
      <SidebarContainer />
      <GalleryContainer />
      <NoticeModalContainer />
      <MakePinGroupContainer />
    </React.Fragment>
  );
}
export default App;
