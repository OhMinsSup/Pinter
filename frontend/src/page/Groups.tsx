import * as React from 'react';
import GroupTemplate from '../components/group/GroupTemplate';
import CreateBoxContainer from '../containers/group/CreateBoxContainer';
import GroupList from '../containers/list/GroupList';

const Groups = () => {
    return (
        <GroupTemplate
            box={<CreateBoxContainer/>}
        >
            <GroupList />
        </GroupTemplate>
    )
}

export default Groups;