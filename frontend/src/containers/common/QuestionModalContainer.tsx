import * as React from 'react';
import QuestionModal from '../../components/common/QuestionModal';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import { writeCreators } from '../../store/modules/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type QuestionModalContainerProps = StateProps & DispatchProps;

class QuestionModalContainer extends React.Component<QuestionModalContainerProps> {
    public onConfirm = () => {
        const { BaseActions } = this.props;
        BaseActions.setModal(false);
    }

    public onCancel = async () => {
        const { WriteActions, pinId } = this.props;
    
        try {
            await WriteActions.removePin(pinId);
        } catch (e) {
            console.log(e);
        }
    }

    public render() {
        const { modalVisible } = this.props;
        const { onConfirm } = this;
        return (
            <QuestionModal
                open={modalVisible}
                title="포스트 삭제"
                description="이 포스트를 정말로 삭제하시겠습니까?"
                confirmText="삭제"
                onConfirm={() => console.log('삭제')}
                onCancel={onConfirm}
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

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(QuestionModalContainer);

