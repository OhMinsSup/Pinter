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
type GroupPageViewerProps = StateProps & DispatchProps & OwnProps;

class GroupPageViewer extends React.Component<GroupPageViewerProps> {
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

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { title, activation, groupId } = this.props;
    return (
      <React.Fragment>
        <GroupHeader title={title} activation={activation} />
        <GroupPinList id={groupId} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ group }: StoreState) => ({
  title: group.group.title,
  activation: group.group.activation,
  groupId: group.group.groupId,
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
