import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import UserFollowingCard from '../../containers/recent/UserFollowingCard';

type MatchType = {
    displayName: string,
    tag: string
}

type Props = {
    match: match<MatchType>
}

const UserFollowing: React.SFC<Props> = ({ match }) => {
    return <UserFollowingCard displayName={match.params.displayName}/>;
}

export default withRouter(UserFollowing);