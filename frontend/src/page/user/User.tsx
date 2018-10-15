import * as React from 'react';
import UserTemplate from '../../components/user/UserTemplate';
import HeaderContainer from '../../containers/base/HeaderContainer';
import UserHeadContainer from '../../containers/user/UserHeaderContainer';
import UserContentContainer from '../../containers/user/UserContentContainer';
import UserProfileSetting from '../../containers/user/UserProfileSetting';

const User = () => {
  return (
    <React.Fragment>
      <UserTemplate header={<HeaderContainer />}>
        <UserHeadContainer />
        <UserContentContainer />
      </UserTemplate>
      <UserProfileSetting />
    </React.Fragment>
  );
};

export default User;
