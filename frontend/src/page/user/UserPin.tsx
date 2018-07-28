import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import UserPinCard from '../../containers/recent/UserPinsCard';

type MatchType = {
    displayName: string,
    tag: string
}

type Props = {
    match: match<MatchType>
}

const UserPost: React.SFC<Props> = ({ match }) => {
    return <UserPinCard displayName={match.params.displayName} />;
}

export default withRouter(UserPost);