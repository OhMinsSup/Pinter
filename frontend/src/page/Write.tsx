import * as React from 'react';
import WriteTemplate from '../components/write/WriteTemplate';
import HeaderContainer from '../containers/base/HeaderContainer';
import MakePin from '../containers/pin/MakePin';
import { History } from 'history';

type Props = {
    history: History,
    location: Location,
}

const Write: React.SFC<Props> = ({ history, location }) => {
    return (
        <WriteTemplate
            header={<HeaderContainer/>}
        >
            <MakePin 
                history={history}
                location={location}
            />
        </WriteTemplate>
    );
}

export default Write;