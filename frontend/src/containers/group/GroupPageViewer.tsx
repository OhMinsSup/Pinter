import * as React from 'react';
import GroupHeader from 'src/components/group/GroupHeader';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { withRouter, match } from 'react-router-dom';
import GroupPinList from '../list/GroupPinList';
import { groupCreators } from 'src/store/modules/group';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };
type Props = StateProps & DispatchProps & OwnProps;

class GroupPageViewer extends React.Component<Props> {
  public onSetDelete = () => {
    const { GroupActions, deletePin } = this.props;

    if (deletePin) {
      GroupActions.setDeletePin(false);
    } else {
      GroupActions.setDeletePin(true);
    }
  };

  public onSetUpdate = () => {
    const { GroupActions } = this.props;
    GroupActions.setMakeGroup(true);
  };

  public initialize = async () => {
    const {
      match: {
        params: { id },
      },
      GroupActions,
    } = this.props;

    try {
      await GroupActions.getGroup(id);
    } catch (e) {
      console.log(e);
    }
  };

  public componentDidUpdate(preProps: Props) {
    if (
      preProps.deletePin !== this.props.deletePin ||
      preProps.makeModal !== this.props.makeModal
    ) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const {
      title,
      activation,
      match: {
        params: { id },
        url,
      },
      deletePin,
    } = this.props;
    const { onSetDelete, onSetUpdate } = this;

    return (
      <React.Fragment>
        <GroupHeader
          title={title}
          activation={activation}
          onSetDelete={onSetDelete}
          onSetUpdate={onSetUpdate}
          visible={deletePin}
        />
        <GroupPinList id={id} url={url} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ group }: StoreState) => ({
  title: group.group.title,
  activation: group.group.activation,
  deletePin: group.deletePin.visible,
  makeModal: group.makeModal.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  GroupActions: bindActionCreators(groupCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(GroupPageViewer);
