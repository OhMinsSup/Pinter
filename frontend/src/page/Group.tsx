import * as React from 'react';
import GroupTemplate from 'src/components/group/GroupTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import GroupPageViewer from 'src/containers/group/GroupPageViewer';

const Group = () => {
    return (
        <GroupTemplate
            header={<HeaderContainer />}
        >
            <GroupPageViewer />
        </GroupTemplate>
    )
}

export default Group;