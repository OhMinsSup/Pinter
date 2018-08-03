import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as baseActions } from '../../store/modules/base';
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
    public onBoxClick = async (name: 'like' | 'comment' | 'save', id: string, theme: string): Promise<any> => {
        const { BaseActions, ListActions } = this.props;
        BaseActions.boxFullscreenLoader({
            id: id,
            name: name,
            theme: theme,
            visible: true
        })

        try {
            if (theme === 'like') {
                await ListActions.likeUserList(id);
            } else if (theme === 'comment') {
                await ListActions.commentUserList(id);
            } else if (theme === 'save') {
                await ListActions.lockerUserList(id);
            }
        } catch (e) {
            console.log(e);
        }
    }

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
        const { onBoxClick } = this;
        if (loading) return <Loading />
        
        return (
            <PinCardList pins={pins} onBoxClick={onBoxClick}/>
        )
    }
}

const mapStateToProps = ({ list, base }: StoreState) => ({
    pins: list.tag.pins,
    loading: list.tag.loading,
    like: base.box.like,
    comment: base.box.comment,
    save: base.box.save,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(TagPinsCard);