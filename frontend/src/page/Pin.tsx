import * as React from 'react';
import PinTemplate from '../components/pin/PinTemplate';
import HeaderContainer from '../containers/base/HeaderContainer';
import PinViewer from '../containers/pin/PinViewer';
import PinCommentContainer from '../containers/pin/PinCommentContainer';
import { match } from 'react-router-dom';
import QuestionModalContainer from '../containers/common/QuestionModalContainer';

type Props = {
    match: match<{ id: string }>
}

const Pin: React.SFC<Props> = ({ match }) => {
    const { id } = match.params;
    return (
        <PinTemplate
            header={<HeaderContainer/>}
        >
            <PinViewer id={id}/>
            <PinCommentContainer />
            <QuestionModalContainer/>
        </PinTemplate>
    )
}

export default Pin;