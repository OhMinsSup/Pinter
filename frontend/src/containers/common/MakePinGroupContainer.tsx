import * as React from 'react';
import MakeGroupModal from 'src/components/group/MakeGroupModal';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { groupCreators } from '../../store/modules/group';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class MakePinGroupContainer extends React.Component<Props> {
  public onClick = () => {
    const { GroupActions } = this.props;
    GroupActions.setMakeGroup(false);
  };

  public onSubmit = async (value: string, active: boolean) => {
    const { GroupActions, group } = this.props;

    try {
      if (group) {
        const { groupId } = group;
        await GroupActions.updateGroup(groupId, value, active);
        GroupActions.setMakeGroup(false);
        return;
      }

      await GroupActions.createSubmitGroup({
        title: value,
        activation: active,
      });

      GroupActions.setMakeGroup(false);
    } catch (e) {
      console.log(e);
    }
  };

  public render() {
    const {
      visible,
      group: { groupId },
    } = this.props;
    const { onClick, onSubmit } = this;

    if (!visible) return null;

    return (
      <MakeGroupModal
        groupId={groupId}
        onSubmit={onSubmit}
        onClick={onClick}
        onOpen={visible}
      />
    );
  }
}

const mapStateToProps = ({ group }: StoreState) => ({
  visible: group.makeModal.visible,
  group: group.group,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  GroupActions: bindActionCreators(groupCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(MakePinGroupContainer);
