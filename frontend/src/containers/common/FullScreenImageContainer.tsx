import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import FullScreenImage from '../../components/common/FullScreenImage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type FullScreenImageContainerProps = StateProps & DispatchProps;

class FullScreenImageContainer extends React.Component<FullScreenImageContainerProps> {
    public render() {
      return (
        <FullScreenImage/>
      )
    };
} 

const mapStateToProps = ({ base }: StoreState) => ({
    image: base.image.visible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FullScreenImageContainer);