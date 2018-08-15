import * as React from 'react';
import { withRouter, match } from 'react-router-dom';
import UserSaveCard from '../../containers/recent/UserSaveCard';

type Props = {
    match: match<{ displayName: string }>
}

const UserSaves: React.SFC<Props> = ({ match }) => {
    return  <UserSaveCard displayName={match.params.displayName}/>;
}

export default withRouter(UserSaves);