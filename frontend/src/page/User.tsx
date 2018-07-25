import * as React from 'react';
import HeaderContainer from '../containers/base/HeaderContainer';
import UserTemplate from '../components/user/UserTemplate';
import UserHeadContainer from '../containers/user/UserHeadContainer';
import UserContentContainer from '../containers/user/UserContentContainer';

const User = () => {
    return (
        <UserTemplate header={<HeaderContainer />}>
            <UserHeadContainer />
            <UserContentContainer />
        </UserTemplate>
    );
}

export default User;