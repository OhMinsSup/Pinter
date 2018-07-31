import * as React from 'react';
import PinFeed from '../../components/pin/PinFeed';
import PinSide from '../../components/pin/PinSide';

class PinViewer extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <PinFeed />
                <PinSide />
            </React.Fragment>
        )
    }
}

export default PinViewer;