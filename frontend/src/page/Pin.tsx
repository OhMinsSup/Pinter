import * as React from 'react';
import PinTemplate from '../components/pin/PinTemplate';
import HeaderContainer from '../containers/base/HeaderContainer';
import PinViewer from '../containers/pin/PinViewer';
import PinCommentContainer from '../containers/pin/PinCommentContainer';
import { match } from 'react-router-dom';
import QuestionModalContainer from '../containers/common/QuestionModalContainer';
import { History } from 'history';

type Props = {
    history: History,
    match: match<{ id: string }>
}

const Pin: React.SFC<Props> = ({ match, history }) => {
    const { id } = match.params;
    return (
        <PinTemplate
            header={<HeaderContainer/>}
        >
            <PinViewer 
                id={id}
                history={history}
            />
            <PinCommentContainer />
            <QuestionModalContainer/>
        </PinTemplate>
    )
}

export default Pin;