import * as React from 'react';
import GroupSidebar from '../../components/group/GroupSidebar';
import { match } from 'react-router-dom';

type OwnProps = { match: match<string> };
type GroupSidebarContainerProps = OwnProps;

class GroupSidebarContainer extends React.Component<GroupSidebarContainerProps> {
   public render() {
    const { match: { url } } = this.props;

    return <GroupSidebar url={url}/>
  }
}

export default GroupSidebarContainer;