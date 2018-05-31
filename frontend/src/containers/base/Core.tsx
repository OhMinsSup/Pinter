import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { actionCreators as baseActions } from '../../store/modules/auth';
import { StoreState } from '../../store/modules';
import FullscreenLoader from '../../components/base/FullscreenLoader';


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type CoreProps = StateProps & DispatchProps;

class Core extends React.Component<CoreProps>{
  public render() {
    const { visible } = this.props;
    return (
      <React.Fragment>
            <FullscreenLoader visible={visible}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ base }: StoreState) => ({
    visible: base.fullscreenLoader
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Core);
