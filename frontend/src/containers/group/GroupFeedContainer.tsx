import * as React from 'react';
import GroupFeed from '../../components/group/GroupFeed';
import GroupSidebar from '../../components/group/GroupSidebar';

class GroupPageContainer extends React.Component<{}> {
    public render() {
        return (
            <React.Fragment>
                <GroupFeed />
                <GroupSidebar />
            </React.Fragment>
        )
    }
}

export default GroupPageContainer;