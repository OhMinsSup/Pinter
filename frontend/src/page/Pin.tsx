import * as React from 'react';
import HeaderContainer from '../containers/base/HeaderContainer';
import PinViewerTemplate from '../components/pin/PinViewerTemplate';
import PinViewer from '../containers/pin/PinViewer';

const Pin = () => {
    return (
        <React.Fragment>
            <HeaderContainer />
            <PinViewerTemplate>
                <PinViewer />
            </PinViewerTemplate>
        </React.Fragment>
    )
}

export default Pin;
