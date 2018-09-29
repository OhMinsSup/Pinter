import * as React from 'react';
import GroupTemplate from '../../components/group/GroupTemplate';
import GroupSidebarContainer from '../../containers/group/GroupSidebarContainer';
import { match, Switch, Route } from 'react-router-dom';
import MainGroup from '../../containers/group/MainGroup';
import GroupHeaderContainer from '../../containers/group/GroupHeaderContainer';
import GroupCreateContainer from '../../containers/group/GroupCreateContainer';
import GroupPrimarySidebarContainer from '../../containers/group/GroupPrimarySidebarContainer';

type Props = {
    match: match<string>
}

const Group: React.SFC<Props> = ({ match }) => {
    return (
        <GroupTemplate
            head={<GroupHeaderContainer/>}
            sidebar={<GroupSidebarContainer match={match}/>}
            primarySidebar={<GroupPrimarySidebarContainer/>}
        >
            <Switch>
                <Route exact path="/group" component={MainGroup}/>
                <Route exact path="/group/create" component={GroupCreateContainer} />
            </Switch>
        </GroupTemplate>
    )
}

export default Group;