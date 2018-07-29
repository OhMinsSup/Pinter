import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as listActions } from '../../store/modules/list';
import PinCardList from '../../components/common/PinCardList';
import Loading from '../../components/common/Loading';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    tag: string,
}

type TagPinsCardProps = StateProps & DispatchProps & OwnProps;

class TagPinsCard extends React.Component<TagPinsCardProps> {
    public initialize = async () => {
        const { ListActions, tag } = this.props;

        try {
            await ListActions.getTagPinList(tag);
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { pins, loading } = this.props;
        if (loading) return <Loading />
        
        return (
            <PinCardList pins={pins}/>
        )
    }
}

const mapStateToProps = ({ list }: StoreState) => ({
    pins: list.tag.pins,
    loading: list.tag.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(TagPinsCard);