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
    public onSubmit = async () => {
        const { description, relation_url, tags, urls, PinActions } = this.props;
        const pin = {
            description,
            relation_url,
            tags,
            urls
        };
        try {
            await PinActions.writePin(pin);
            PinActions.initialPin();
            // TODO 보드 설정으로 이동
        } catch (e) {
            PinActions.initialPin();
            console.log(e);
        }
    }

    public uploadUrl = async (file: any) => {
        const { PinActions } = this.props;
        
        PinActions.setUploadStatus(true);
        try {            
            await PinActions.createUploadUrl(file);
            PinActions.setUploadStatus(false);
        } catch (e) {
            PinActions.setUploadStatus(false);
            console.log(e);
        }
    }

    public uploadRemove = () => {
        const { PinActions } = this.props;
        PinActions.removeUploadUrl();
    }

    public onDrop = (e: any) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        if (!files) return;
        this.uploadUrl(files[0]);
    }

    public onPasteImage = (file: any) => {
        if (!file) return;
        this.uploadUrl(file);
    };

    public onUploadClick = () => {
        const upload = document.createElement('input');
        upload.type = 'file';
        upload.onchange = (e) => {                        
            if (!upload.files) return;
            const file = upload.files[0];
            this.uploadUrl(file);
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
        PinActions.initialPin();
    }   

    public render() {
        const { visible, description, relation_url, tags, thumbnails } = this.props;
        const { onDrop, onPasteImage, onUploadClick, onChangeInput, onInsertTag, onRemoveTag, onClose, uploadRemove, onSubmit } = this;
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
                        onDrop={onDrop}
                        onPaste={onPasteImage}
                        onUploadClick={onUploadClick}
                    />}
                        description={description}
                        relation_url={relation_url}
                        onChangInput={onChangeInput}
                        onClose={onClose}
                        uploadRemove={uploadRemove}
                        thumbnails={thumbnails}
                        onSubmit={onSubmit}
                />
            </PinTemplate>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    description: pin.description,
    thumbnails: pin.upload.url,
    relation_url: pin.relation_url,
    urls: pin.urls,
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