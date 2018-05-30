import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { actionCreators as baseActions } from './store/modules/auth';
import { StoreState } from './store/modules';
import { Home } from './page';
import FullscreenLoader from './components/base/FullscreenLoader';

type Props = {
  visible: boolean,
  baseActions: typeof baseActions
}

class App extends React.Component<Props> {
  public render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route pate="/" component={Home} />
        </Switch>
        <FullscreenLoader visible={visible}/>
      </React.Fragment>
    );
  }
}

export default connect(
  ({ base }: StoreState) => ({
    visible: base.fullscreenLoader
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(App);

