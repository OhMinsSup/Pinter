import * as React from 'react';
import GroupTemplate from '../../components/group/GroupTemplate';
import GroupFeedContainer from '../../containers/group/GroupFeedContainer';

const GroupPage = () => {
    return (
        <GroupTemplate>
            <GroupFeedContainer />
        </GroupTemplate>
    )
}

export default GroupPage;