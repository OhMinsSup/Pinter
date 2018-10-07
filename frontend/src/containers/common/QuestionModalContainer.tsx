import * as React from 'react';
import QuestionModal from '../../components/common/QuestionModal';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators, compose } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import { writeCreators } from '../../store/modules/write';
import { withRouter } from 'react-router';
import { History } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { history: History };

type QuestionModalContainerProps = StateProps & DispatchProps & OwnProps;

class QuestionModalContainer extends React.Component<QuestionModalContainerProps> {
    public onCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.setModal(false);
    }

    public onConfirm = async () => {
        const { WriteActions, pinId, BaseActions, history } = this.props;
    
        try {
            await WriteActions.removePin(pinId);
        } catch (e) {
            console.log(e);
        }

        BaseActions.setModal(false);
        history.push('/');
    }

    public render() {
        const { modalVisible } = this.props;
        const { onConfirm, onCancel } = this;
        return (
            <QuestionModal
                open={modalVisible}
                title="포스트 삭제"
                description="이 포스트를 정말로 삭제하시겠습니까?"
                confirmText="삭제"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        )
    }
}

const mapStateToProps = ({ base, write }: StoreState) => ({
    modalVisible: base.modal.visible,
    pinId: write.pinId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    WriteActions: bindActionCreators(writeCreators, dispatch),
})

export default compose(
    withRouter,
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(QuestionModalContainer);

