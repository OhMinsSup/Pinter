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
    const { GroupActions } = this.props;

    try {
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
    const { visible } = this.props;
    const { onClick, onSubmit } = this;

    if (!visible) return null;

    return (
      <MakeGroupModal onSubmit={onSubmit} onClick={onClick} onOpen={visible} />
    );
  }
}

const mapStateToProps = ({ group }: StoreState) => ({
  visible: group.MakeModal.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  GroupActions: bindActionCreators(groupCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(MakePinGroupContainer);
