import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { tagCreators, TagDataSubState } from '../../store/modules/tag';
import TagItemList from '../../components/tag/TagItemList';

type OwnProps = { sort: string };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type TagItemListContainerProps = OwnProps & StateProps & DispatchProps;

class TagItemListContainer extends React.Component<TagItemListContainerProps> {
  public onSelectTag = (info: TagDataSubState) => {
    const { TagActions } = this.props;
    TagActions.setTagInfo(info);
  };

  public initialize = () => {
    const { sort, TagActions } = this.props;
    TagActions.getTags(sort);
  };

  public componentDidUpdate(prevProps: TagItemListContainerProps) {
    if (prevProps.sort !== this.props.sort) {
      this.initialize();
    }
  }

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    const { tags } = this.props;
    const { onSelectTag } = this;
    return <TagItemList tags={tags} onSelectTag={onSelectTag} />;
  }
}

const mapStateToProps = ({ tag }: StoreState) => ({
  tags: tag.tags,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  TagActions: bindActionCreators(tagCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(TagItemListContainer);
