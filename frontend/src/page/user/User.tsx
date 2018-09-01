import * as React from 'react';
import UserTemplate from '../../components/user/UserTemplate';
import HeaderContainer from '../../containers/base/HeaderContainer';
import UserHeadContainer from '../../containers/user/UserHeaderContainer';

const User = () => {
    return (
        <UserTemplate
            header={<HeaderContainer />}
        >
            <UserHeadContainer />
        </UserTemplate>
    )
}

export default User;