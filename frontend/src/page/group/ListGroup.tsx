import * as React from 'react';
import ListGroupTemplate from '../../components/group/ListGroupTemplate';
import CreateBoxContainer from '../../containers/group/CreateBoxContainer';
import GroupList from '../../containers/list/GroupList';

const ListGroup = () => {
    return (
        <ListGroupTemplate
            box={<CreateBoxContainer/>}
        >
            <GroupList />
        </ListGroupTemplate>
    )
}

export default ListGroup;