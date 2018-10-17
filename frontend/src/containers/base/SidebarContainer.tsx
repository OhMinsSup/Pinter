import * as React from 'react';
import Sidebar from '../../components/base/Sidebar';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import { userCreators } from '../../store/modules/user';
import Storage from '../../lib/storage';
import { noticeCreators } from '../../store/modules/notice';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class SidebarContainer extends React.Component<Props> {
  public onClose = () => {
    const { BaseActions } = this.props;
    BaseActions.setSidebar(false);
  };

  public onToggleNotice = () => {
    const { NoticeActions, BaseActions } = this.props;
    NoticeActions.noticeConfirm();
    BaseActions.setSidebar(false);
  };

  public onLogout = async () => {
    const { UserActions } = this.props;
    try {
      await UserActions.logout();
    } catch (e) {
      console.log(e);
    }
    Storage.remove('__pinter_user__');
    window.location.href = '/';
  };

  public render() {
    const { visible, displayName, size } = this.props;

    if (!visible) return null;

    return (
      <Sidebar
        displayName={displayName}
        onClose={this.onClose}
        onToggleNotice={this.onToggleNotice}
        size={size}
        onLogout={this.onLogout}
      />
    );
  }
}

const mapStateToProps = ({ base, user }: StoreState) => ({
  visible: base.sidebar.visible,
  size: base.size,
  displayName: user.user && user.user.displayName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
  UserActions: bindActionCreators(userCreators, dispatch),
  NoticeActions: bindActionCreators(noticeCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
