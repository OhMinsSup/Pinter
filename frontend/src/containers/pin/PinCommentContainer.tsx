import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinComment from '../../components/pin/PinComment';
import PinComments from '../../components/pin/PinComments';
import { bindActionCreators, compose } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { pinCreators } from '../../store/modules/pin';
import { commonCreators } from '../../store/modules/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };
type PinCommentContainerProps = StateProps & DispatchProps & OwnProps;

type OwnState = {
  visible: boolean;
};

class PinCommentContainer extends React.Component<
  PinCommentContainerProps,
  OwnState
> {
  public state = {
    visible: false,
  };

  public onClickComments = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible ? true : false,
    });
  };

  public onSubmit = async () => {
    const { PinActions, CommonActions, match, value, tags } = this.props;
    const {
      params: { id },
    } = match;

    try {
      await PinActions.writeComment(id, value, tags);
      await CommonActions.sendMessage('작성하신 핀에 댓글을 작성');
    } catch (e) {
      console.log(e);
    }
  };

  public onChangeComment = (e: any) => {
    const { value, name } = e.target;
    const { PinActions } = this.props;
    PinActions.changeInputComment({ value, name });
  };

  public onInsertTag = (tag: string) => {
    const { PinActions, tags } = this.props;
    const processedTag = tag.trim();
    if (processedTag === '') return;
    if (tags.indexOf(tag) !== -1) return;
    PinActions.insertTag(tag);
  };

  public onRemoveComment = async (commentId: string) => {
    const {
      PinActions,
      match: {
        params: { id },
      },
    } = this.props;

    try {
      await PinActions.removeComment(id, commentId);
    } catch (e) {
      console.log(e);
    }
  };

  public onRemoveTag = (tag: string) => {
    const { PinActions } = this.props;
    PinActions.removeTag(tag);
  };

  public initialize = async () => {
    const { PinActions, match } = this.props;
    const {
      params: { id },
    } = match;

    try {
      await PinActions.listComment(id);
    } catch (e) {
      console.log(e);
    }
  };

  public componentDidUpdate(prevProps: PinCommentContainerProps) {
    if (prevProps.value !== this.props.value) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { loading, value, tags, comments, user: ownUser } = this.props;
    const { visible } = this.state;
    const {
      onChangeComment,
      onInsertTag,
      onRemoveTag,
      onSubmit,
      onRemoveComment,
      onClickComments,
    } = this;
    if (loading) return null;

    return (
      <React.Fragment>
        <PinComment
          value={value}
          tags={tags}
          onOpen={visible}
          onChangeComment={onChangeComment}
          onInsert={onInsertTag}
          onRemove={onRemoveTag}
          onSubmit={onSubmit}
          onClick={onClickComments}
        />
        {!visible ? null : (
          <PinComments
            comments={comments}
            ownUser={ownUser}
            onRemoveComment={onRemoveComment}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ pin, user }: StoreState) => ({
  pinId: pin.pin.pinId,
  loading: pin.loading.pin,
  value: pin.comment.value,
  tags: pin.comment.tags,
  comments: pin.comments,
  user: user.user && user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  PinActions: bindActionCreators(pinCreators, dispatch),
  CommonActions: bindActionCreators(commonCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(PinCommentContainer);
