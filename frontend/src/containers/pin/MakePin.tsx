import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as pinActions } from '../../store/modules/pin';
import PinTemplate from '../../components/pin/PinTemplate';
import FormPin from '../../components/pin/FormPin';
import InputTags from '../../components/pin/InputTags';
import DropImage from '../../components/pin/DropImage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type MakePinProps = StateProps & DispatchProps;

class MakePin extends React.Component<MakePinProps> {
    public onDragEnter = (e: any) => {
        e.preventDefault();
        setImmediate(() => {
          console.log(e);
        });
    };

    public onDragLeave = (e: any) => {
        e.preventDefault();
        if (!e.relatedTarget) return;
    };

    public onDrop = (e: any) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        if (!files) return;
        console.log(files);
    }

    public onPasteImage = (file: any) => {
        if (!file) return;
        console.log(file);
    };

    public onUploadClick = () => {
        const upload = document.createElement('input');
        upload.type = 'file';
        upload.onchange = (e) => {
            if (!upload.files) return;
            const file = upload.files[0];
            console.log(file);
        }
        upload.click();
    }

    public onInsertTag = (tag: string) => {
        const { tags, PinActions } = this.props;
        const processedTag = tag.trim();
        if (processedTag === '') return;
        if (tags.indexOf(tag) !== -1) return;
        PinActions.insertTag(tag);
    }

    public onRemoveTag = (tag: string) => {
        const { PinActions } = this.props;
        PinActions.removeTag(tag);
    };

    public onChangeInput = (e: any) => {
        const { value, name } = e.target;
        const { PinActions } = this.props;        
        PinActions.changeInput({ name, value });
    }

    public onClose = () => {
        const { PinActions } = this.props;
        PinActions.setMakePinFullscreenLoader(false);
    }   

    public render() {
        const { visible, description, relation_url, tags } = this.props;
        const { onDragEnter, onDragLeave, onDrop, onPasteImage, onUploadClick, onChangeInput, onInsertTag, onRemoveTag, onClose } = this;
        if (!visible) return null;
        return (
            <PinTemplate>
                <FormPin 
                    inputTags={<InputTags 
                        tags={tags}
                        onInsert={onInsertTag} 
                        onRemove={onRemoveTag}
                    />}
                    dropImage={<DropImage 
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onPaste={onPasteImage}
                        onUploadClick={onUploadClick}
                    />}
                        description={description}
                        relation_url={relation_url}
                        onChangInput={onChangeInput}
                        onClose={onClose}
                />
            </PinTemplate>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    description: pin.description,
    relation_url: pin.relation_url,
    visible: pin.visible,
    tags: pin.tags
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    PinActions: bindActionCreators(pinActions, dispatch)
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(MakePin);