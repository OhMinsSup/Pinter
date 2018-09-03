import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { tagCreators } from '../../store/modules/tag';
import TagCurrent from '../../components/tag/TagCurrent';

type OwnProps = { tag: string }
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type TagCurrentContainerProps = OwnProps & StateProps & DispatchProps;

class TagCurrentContainer extends React.Component<TagCurrentContainerProps> {
    public initialize  = () => {
        const { tag, TagActions } = this.props;
        return TagActions.getTagInfo(tag);
    }
    
    public componentDidMount() {
        this.initialize();
    }

    public componentDidUpdate(prevProps: TagCurrentContainerProps) {
        if (prevProps.tag !== this.props.tag) {
          this.initialize();
        }
    }

    public componentWillUnmount() {
        const { TagActions } = this.props;
        TagActions.setTagInfo();
      }
    
    public render() {
        const { tag, selected, lastSort } = this.props;
        
        return (
            <TagCurrent 
                lastSort={lastSort}
                name={tag}
                count={selected.length}
            />
        );
    }
}

const mapStateToProps = ({ tag }: StoreState) => ({
    selected: tag.selected,
    lastSort: tag.sort,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    TagActions: bindActionCreators(tagCreators, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(TagCurrentContainer);