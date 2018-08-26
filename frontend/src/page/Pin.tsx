import * as React from 'react';
import PinTemplate from '../components/pin/PinTemplate';
import HeaderContainer from '../containers/base/HeaderContainer';
import PinViewer from '../containers/pin/PinViewer';

type Props = {

}

const Pin: React.SFC<Props> = ({  }) => {
    return (
        <PinTemplate
            header={<HeaderContainer/>}
        >
            <PinViewer />
        </PinTemplate>
    )
}

export default Pin;