import * as React from 'react';
import WriteTemplate from '../components/write/WriteTemplate';
import HeaderContainer from '../containers/base/HeaderContainer';
import MakePin from '../containers/pin/MakePin';
import { History } from 'history';
import SettingPinBox from '../containers/pin/SettingPinBox';

type Props = {
    history: History,
    location: Location,
}

const Write: React.SFC<Props> = ({ history, location }) => {
    return (
        <React.Fragment>
            <WriteTemplate
                header={<HeaderContainer/>}
            >
                <MakePin 
                    history={history}
                    location={location}
                />
            </WriteTemplate>
            <SettingPinBox />
        </React.Fragment>
    );
}

export default Write;