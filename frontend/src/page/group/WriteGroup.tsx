import * as React from 'react';
import WriteGroupTemplate from '../../components/group/WriteGroupTemplate';
import WriteGroupContainer from '../../containers/group/WriteGroupContainer';

const WriteGroup = () => {
    return (
        <div>
            <WriteGroupTemplate>
                <WriteGroupContainer/>
            </WriteGroupTemplate>
        </div>
    )
}

export default WriteGroup;