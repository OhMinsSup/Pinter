import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as baseActions } from '../../store/modules/base';
import { actionCreators as listActions } from '../../store/modules/list';
import ListTemplate from '../../components/common/ListTemplate';
import ListBox from '../../components/common/ListBox';
 
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type ListBoxUsersProps = StateProps & DispatchProps;

class ListBoxUsers extends React.Component<ListBoxUsersProps> {
    public onBoxClick = (): any => {
        const { BaseActions, theme } = this.props;
        BaseActions.boxFullscreenLoader({
            id: '',
            name: theme,
            theme: '',
            visible: false
        })
    }

    public render() {
        const { like, like_user, comment_user, locker_user, theme, comment, save } = this.props;
        const { onBoxClick } = this;
        let loading: boolean = false;
        let user: any[] = [];

        if (theme === 'like') {
            loading = like;
            user = like_user;
        } else if (theme === 'comment') {
            loading = comment;
            user = comment_user;
        } else if (theme === 'save') {
            loading = save;
            user = locker_user;
        }

        if (!loading) return null;
        
        return (
            <ListTemplate onBoxClick={onBoxClick}>
                <ListBox title={theme} user={user}/>
            </ListTemplate>
        );
    }
}

const mapStateToProps = ({ list, base }: StoreState) => ({
    like_user: list.like_user.user,
    comment_user: list.comment_user.user,
    locker_user: list.locker_user.user,
    prefetched: list.like_user.prefetched,
    like: base.box.like,
    comment: base.box.comment,
    save: base.box.save,
    pinId: base.box.pinId,
    theme: base.box.theme
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ListActions: bindActionCreators(listActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ListBoxUsers);

