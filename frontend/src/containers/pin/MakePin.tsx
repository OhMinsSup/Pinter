import * as React from 'react';
import WriteTemplate from '../../components/write/WriteTemplate';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import WriteForm from '../../components/write/WriteForm';
import InputTags from '../../components/write/InputTags';
import DropImage from '../../components/write/DropImage';
import { writeCreators } from '../../store/modules/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type MakePinProps = StateProps & DispatchProps

class MakePin extends React.Component<MakePinProps> {
    public onSubmit = async () => {
        const { WriteActions, tags, relationUrl, body, urls } = this.props;

        try {
            await WriteActions.writeSubmit({
                tags,
                body,
                urls,
                relationUrl
            });

            WriteActions.initialState();
        } catch (e) {
            console.log(e);
        }
    }

    public onCloseBox = () => {
        const { BaseActions } = this.props;
        BaseActions.openPinBox(false);
    }

    public OnUploadUrl = async (file: any) => {
        const { WriteActions } = this.props;
        
        WriteActions.setUploadStatus(true);

        try {
            await WriteActions.createUploadUrl(file);
        } catch (e) {
            console.log(e);
        }
        WriteActions.setUploadStatus(false);
    }

    public onRemoveUrl = (url: string) => {
        const { WriteActions } = this.props;
        WriteActions.removeUploadUrl(url);
    }

    public uploadRemove = () => {
        console.log('gkgk');
    }

    public onDrop = (e: any) => {
        e.preventDefault();
        const { files } = e.dataTransfer;
        if (!files) return;
        this.OnUploadUrl(files[0]);
    }

    public onPasteImage = (file: any) => {
        if (!file) return;
        this.OnUploadUrl(file);
    };

    public onUploadClick = () => {
        const upload = document.createElement('input');
        upload.type = 'file';
        upload.onchange = (e) => {                        
            if (!upload.files) return;
            const file = upload.files[0];
            this.OnUploadUrl(file);
        }
        upload.click();
    }

    public onInsertTag = (tag: string) => {
        const { WriteActions, tags } = this.props;
        const processedTag = tag.trim();
        if (processedTag === '') return;
        if (tags.indexOf(tag) !== -1) return;
        WriteActions.insertTag(tag);
    }

    public onRemoveTag = (tag: string) => {
        console.log(tag);
        
        const { WriteActions } = this.props;
        WriteActions.removeTag(tag)
    };

    public onChangeInput = (e: any) => {
        const { value, name } = e.target;
        const { WriteActions } = this.props;
        WriteActions.changeInput({ name, value });
    }

    public render() {
        const { visible, size, body, relationUrl,tags, urls } = this.props;
        const { 
            onInsertTag, 
            onRemoveTag, 
            onDrop, 
            onPasteImage, 
            onUploadClick, 
            onCloseBox, 
            onChangeInput,
            onRemoveUrl,
            onSubmit, 
        } = this;

        if (!visible) return null;
        return (
            <WriteTemplate
                size={size}
                onClick={onCloseBox}
            >
                <WriteForm 
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
                    size={size}
                    onCloseBox={onCloseBox}
                    onChange={onChangeInput}
                    body={body}
                    urls={urls}
                    relationUrl={relationUrl}
                    onRemoveUrl={onRemoveUrl}
                    onSubmit={onSubmit}
                />
            </WriteTemplate>
        )
    }
}

const mapStateToProps = ({ base, write }: StoreState) => ({
    visible: base.pin.visible,
    size: base.size,
    body: write.form.body,
    relationUrl: write.form.relation_url,
    tags: write.form.tags,
    urls: write.form.urls,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    WriteActions: bindActionCreators(writeCreators, dispatch),
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(MakePin);