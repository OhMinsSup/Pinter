import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { StoreState } from '../../store/modules';
import { actionCreators as pinActions } from '../../store/modules/pin';
import PinFeed from '../../components/pin/PinFeed';
import PinSide from '../../components/pin/PinSide';
import PinMenu from '../../components/pin/PinMenu';

type MatchType = {
    id: string
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    match: match<MatchType>,
}

type PinViewerProps = StateProps & DispatchProps & OwnProps;

class PinViewer extends React.Component<PinViewerProps> {
    public onHideMenuClick = () => {
        const { PinActions } = this.props;
        PinActions.hidePinMenu(false);
    }

    public onShowMenuClick = (): any => {
        const { PinActions, menu } = this.props;
        if (!menu) {
           return PinActions.showPinMenu(true);
        } else {
            return PinActions.hidePinMenu(false);
        }
    }

    public onToggleLike = () => {
        const { PinActions, liked,  match: { params: { id } } } = this.props;

        if (liked) {
            PinActions.UnLikePin(id);
        } else {
            PinActions.LikePin(id)
        }
    }

    public onChangeComment = (e: any) => {
        const { PinActions } = this.props;
        const { value } = e.target;
    
        PinActions.commentChagneInput(value);
    }

    public onKeyPress = (e: any) => {
        const { key } = e;
        if (key === "Enter") {
            e.preventDefault();
            console.log('작성중');
        }
    }

    public initialize = async () => {
        const { PinActions, match: { params: { id } } } = this.props;
        
        try {
            await PinActions.getPin(id);
            await PinActions.getLikePin(id);
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { pin, menu, value } = this.props;
        const { onToggleLike, onShowMenuClick, onHideMenuClick, onChangeComment, onKeyPress } = this;
        return (
            <React.Fragment>
                <PinFeed 
                    pin={pin} 
                    onClick={onShowMenuClick}
                    onToggleLike={onToggleLike} 
                    onChangeComment={onChangeComment}
                    onKeyPress={onKeyPress}
                    value={value}
                />
                <PinMenu 
                    onClick={onHideMenuClick}
                    visible={menu}
                />
                <PinSide 
                    tags={pin.tags}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    pin: pin.pin,
    liked: pin.liked,
    menu: pin.menu,
    value: pin.comment.value
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinActions, dispatch)
})

export default compose(
    withRouter, 
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(PinViewer);