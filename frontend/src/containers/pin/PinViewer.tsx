import * as React from 'react';
import PinViewerTemplate from '../../components/pin/PinViewerTemplate';
import PinCancelButton from '../../components/pin/PinCancelButton';
import PinWrapper from '../../components/pin/PinWrapper';
import PinHeader from '../../components/pin/PinHeader';

class PinViewer extends React.Component {
    public render() {
        return (
            <PinViewerTemplate>
                <PinCancelButton />
                <PinWrapper
                    header={<PinHeader />}
                />
            </PinViewerTemplate>
        )
    }
}

export default PinViewer;