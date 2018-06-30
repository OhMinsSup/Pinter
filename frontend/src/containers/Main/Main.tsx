import * as React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import HeaderContainer from '../../containers/base/HeaderContainer';

class Main extends React.Component {
    public render() {
        return (
            <MainTemplate
                header={<HeaderContainer />}
            >
                내용
            </MainTemplate>
        )
    }
}

export default Main;