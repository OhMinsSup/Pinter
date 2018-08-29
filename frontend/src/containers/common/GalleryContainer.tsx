import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import Gallery from '../../components/common/Gallery';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type GalleryContainerProps = StateProps & DispatchProps;

class GalleryContainer extends React.Component<GalleryContainerProps> {
    public render() {
        let urls = [
            "https://pbs.twimg.com/media/DltmAN7X0AMOtdc.jpg:large",
            // "https://pbs.twimg.com/media/DltmAN7X0AMOtdc.jpg:large",
           // "https://pbs.twimg.com/media/DltmAN7X0AMOtdc.jpg:large"
        ]
        return (
            <Gallery urls={urls}/>
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
)(GalleryContainer);