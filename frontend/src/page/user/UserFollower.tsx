import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import UserFollowerCard from '../../containers/recent/UserFollowerCard';

type MatchType = {
    displayName: string
}

type Props = {
    match: match<MatchType>
}

const UserFollower: React.SFC<Props> = ({ match }) => {
    return <UserFollowerCard displayName={match.params.displayName}/>
}

export default withRouter(UserFollower);