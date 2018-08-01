import * as React from 'react';
import ListTemplate from '../../components/common/ListTemplate';
import ListBox from '../../components/common/ListBox';
 

class FullScreenListContainer extends React.Component {
    public render() {
        let visible: boolean = false;

        if (!visible) return null;
        return (
            <ListTemplate>
                <ListBox />
            </ListTemplate>
        );
    }
}

export default FullScreenListContainer;