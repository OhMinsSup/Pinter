import * as React from 'react';
import PinFeed from '../../components/pin/PinFeed';
import PinSide from '../../components/pin/PinSide';
import PinMenu from '../../components/pin/PinMenu';

class PinViewer extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <PinFeed />
                <PinMenu />
                <PinSide />
            </React.Fragment>
        )
    }
}

export default PinViewer;