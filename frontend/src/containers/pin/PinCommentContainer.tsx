import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import PinComment from '../../components/pin/PinComment';
import PinComments from '../../components/pin/PinComments';
import { bindActionCreators, compose } from 'redux';
import { withRouter, match } from'react-router-dom';
import { pinCreators } from '../../store/modules/pin';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }> };
type PinCommentContainerProps = StateProps & DispatchProps & OwnProps;

class PinCommentContainer extends React.Component<PinCommentContainerProps> {
    public onSubmit = async () => {
        const { PinActions, match, value, tags } = this.props;
        const { params: { id } } = match;

        try {
            await PinActions.writeComment(id, value, tags);            
        } catch (e) {
            console.log(e);
        }
    }
    
    public onChangeComment = (e: any) => {
        const { value, name } = e.target;
        const { PinActions } = this.props;
        PinActions.changeInputComment({ value, name });
    }

    public onInsertTag = (tag: string) => {
        const { PinActions, tags } = this.props;
        const processedTag = tag.trim();
        if (processedTag === '') return;
        if (tags.indexOf(tag) !== -1) return;
        PinActions.insertTag(tag);
    }

    public onRemoveTag = (tag: string) => {        
        const { PinActions } = this.props;
        PinActions.removeTag(tag)
    };

    public initialize = async () => {
        const { PinActions, match } = this.props;
        const { params: { id } } = match;

        try {
            await PinActions.listComment(id);
        } catch (e) {
            console.log(e);
        }
    }

    public componentDidUpdate(prevProps: PinCommentContainerProps) {
        if (prevProps.value !== this.props.value) {
            this.initialize();
        }
    }

    public componentDidMount() {
        this.initialize();
    }

    public render() {
        const { loading, value, tags, comments } = this.props;
        const { onChangeComment, onInsertTag, onRemoveTag, onSubmit } = this;
        if (loading) return null;
        return (
            <React.Fragment>
                <PinComment
                    value={value}
                    tags={tags}
                    onChangeComment={onChangeComment}
                    onInsert={onInsertTag} 
                    onRemove={onRemoveTag}
                    onSubmit={onSubmit}
                />
                <PinComments
                    comments={comments}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    pinId: pin.pin.pinId,
    loading: pin.loading.pin,
    value: pin.comment.value,
    tags: pin.comment.tags,
    comments: pin.comments
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinCreators, dispatch),
});

export default compose(
    withRouter, 
    connect<StateProps, DispatchProps, OwnProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(PinCommentContainer);