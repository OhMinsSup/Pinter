import * as React from 'react';
import UserTemplate from '../../components/user/UserTemplate';
import HeaderContainer from '../../containers/base/HeaderContainer';
import UserHeadContainer from '../../containers/user/UserHeaderContainer';
import UserContentContainer from '../../containers/user/UserContentContainer';

const User = () => {
    return (
        <UserTemplate
            header={<HeaderContainer />}
        >
            <UserHeadContainer />
            <UserContentContainer />
        </UserTemplate>
    )
}

export default User;