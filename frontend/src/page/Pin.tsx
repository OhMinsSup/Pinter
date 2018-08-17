import * as React from 'react';
import HeaderContainer from '../containers/base/HeaderContainer';
import PinViewerTemplate from '../components/pin/PinViewerTemplate';
import PinViewer from '../containers/pin/PinViewer';
import PinCommentContainer from '../containers/pin/PinCommentContainer';

type Props = {}

const Pin: React.SFC<Props> = () => {
    return (
        <React.Fragment>
            <HeaderContainer />
            <PinViewerTemplate>
                <PinViewer />
            </PinViewerTemplate>
            <PinCommentContainer />
        </React.Fragment>
    )
}

export default Pin;
