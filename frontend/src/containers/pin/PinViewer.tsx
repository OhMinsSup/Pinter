import * as React from 'react';
import PinViewerTemplate from '../../components/pin/PinViewerTemplate';
import PinCancelButton from '../../components/pin/PinCancelButton';
import PinWrapper from '../../components/pin/PinWrapper';
import PinHeader from '../../components/pin/PinHeader';
import PinContent from '../../components/pin/PinContent';

class PinViewer extends React.Component {
    public render() {
        return (
            <PinViewerTemplate>
                <PinCancelButton />
                <PinWrapper
                    header={<PinHeader />}
                    content={<PinContent />}
                />
            </PinViewerTemplate>
        )
    }
}

export default PinViewer;