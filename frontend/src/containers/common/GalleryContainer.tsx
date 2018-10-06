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
    public onClose = () => {
        const { BaseActions } = this.props;
        BaseActions.setPinImage(false);
    }

    public render() {
        const { onClose } = this;
        const { image, urls } = this.props;
        if (!image) return null;
        return (
            <Gallery 
                urls={urls}
                onClose={onClose}
            />
        )
    };
} 

const mapStateToProps = ({ base, pin }: StoreState) => ({
    image: base.image.visible,
    urls: pin.pin.urls,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(GalleryContainer);