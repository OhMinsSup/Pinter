import * as React from 'react';
import UserHeader from '../../components/user/UserHeader';
import { Dispatch, compose } from 'redux';
import { StoreState } from '../../store/modules';
import { withRouter, match } from 'react-router';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ displayName: string }> };
type UserHeadContainerProps = StateProps & DispatchProps & OwnProps

class UserHeadContainer extends React.Component<UserHeadContainerProps> {
    public render() {
        const { match: { url } } = this.props;
        return (
            <UserHeader
                userId="123123"
                id="123123"
                thumbnail="https://pbs.twimg.com/profile_images/1012762345238454272/Q9jiI1pL_bigger.jpg"
                username="오민섭"
                follower={2}
                following={2}
                follow={false}
                url={url}
                pin={2}
                displayName="veloss"
            />
        )
    }
}

const mapStateToProps = ({}: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserHeadContainer);