import * as React from 'react';
import GroupTemplate from '../components/group/GroupTemplate';
import CreateBoxContainer from '../containers/group/CreateBoxContainer';

const Group = () => {
    return (
        <GroupTemplate
            box={<CreateBoxContainer/>}
        >
            하하핳ㅎㅎㅎㅎㅎㅎㅎ
        </GroupTemplate>
    )
}

export default Group;