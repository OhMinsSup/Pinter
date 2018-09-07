import * as React from 'react';
import WriteGroupTemplate from '../../components/group/WriteGroupTemplate';
import WriteGroupContainer from '../../containers/group/WriteGroupContainer';

const WriteGroup = () => {
    return (
        <WriteGroupTemplate>
            <WriteGroupContainer/>
        </WriteGroupTemplate>
    )
}

export default WriteGroup;