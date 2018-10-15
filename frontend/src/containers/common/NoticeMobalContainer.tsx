import * as React from 'react';
import CommonBoxModal from '../../components/common/CommonBoxModal';
import NoticeItemList from '../../components/common/NoticeItemList';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { noticeCreators } from '../../store/modules/notice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type NoticeModalContainerProps = StateProps & DispatchProps;

class NoticeModalContainer extends React.Component<NoticeModalContainerProps> {
  public onToggleNotice = () => {
    const { NoticeActions } = this.props;
    NoticeActions.noticeCancel();
  };

  public initialize = async () => {
    const { NoticeActions } = this.props;

    try {
      await NoticeActions.getNoticeMessage();
    } catch (e) {
      console.log(e);
    }
  };

  public componentDidMount() {
    this.initialize();
  }

  public componentDidUpdate(preProps: NoticeModalContainerProps) {
    if (preProps.visible !== this.props.visible) {
      this.initialize();
    }
  }

  public render() {
    const { visible, messages } = this.props;
    const { onToggleNotice } = this;
    if (!visible) return null;

    return (
      <CommonBoxModal title="알림" open={visible} onClick={onToggleNotice}>
        <NoticeItemList messages={messages} />
      </CommonBoxModal>
    );
  }
}

const mapStateToProps = ({ notice }: StoreState) => ({
  visible: notice.notice.visible,
  messages: notice.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  NoticeActions: bindActionCreators(noticeCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(NoticeModalContainer);
