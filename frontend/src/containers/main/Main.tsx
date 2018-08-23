import * as React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../base/HeaderContainer';

class Main extends React.Component<{}, {}> {
    public render() {
        return(
            <MainTemplate
                header={<HeaderContainer />}
            >
                sdsds
            </MainTemplate>
        )
    }
}

export default Main;