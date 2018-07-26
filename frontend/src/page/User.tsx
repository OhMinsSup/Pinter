import * as React from 'react';
import HeaderContainer from '../containers/base/HeaderContainer';
import UserTemplate from '../components/user/UserTemplate';
import UserHeadContainer from '../containers/user/UserHeadContainer';
import UserContentContainer from '../containers/user/UserContentContainer';
import MakePin from '../containers/pin/MakePin';
import SettingProfileContainer from '../containers/setting/SettingProfileContainer';

const User = () => {
    return (
        <UserTemplate header={<HeaderContainer />}>
            <UserHeadContainer />
            <UserContentContainer />
            <MakePin />
            <SettingProfileContainer />
        </UserTemplate>
    );
}

export default User;