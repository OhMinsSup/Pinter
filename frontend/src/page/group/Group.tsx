import * as React from 'react';
import GroupTemplate from '../../components/group/GroupTemplate';
import GroupSidebarContainer from '../../containers/group/GroupSidebarContainer';
import { match, Switch, Route } from 'react-router-dom';
import MainGroup from '../../containers/group/MainGroup';
import GroupHeaderContainer from '../../containers/group/GroupHeaderContainer';

const Test = () => {
    return (
        <div>사이드</div>
    )
}

type Props = {
    match: match<string>
}

const Group: React.SFC<Props> = ({ match }) => {
    return (
        <GroupTemplate
            head={<GroupHeaderContainer/>}
            sidebar={<GroupSidebarContainer
                match={match}
            />}
            primarySidebar={<Test/>}
        >
            <Switch>
                <Route exact path="/group" component={MainGroup}/>
            </Switch>
        </GroupTemplate>
    )
}

export default Group;