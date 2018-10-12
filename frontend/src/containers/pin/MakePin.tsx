import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import WriteForm from '../../components/write/WriteForm';
import InputTags from '../../components/write/InputTags';
import DropImage from '../../components/write/DropImage';
import { writeCreators } from '../../store/modules/write';
import { History } from 'history';
import { commonCreators } from '../../store/modules/common';
import { groupCreators } from 'src/store/modules/group';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { history: History, location: Location };

type MakePinProps = StateProps & DispatchProps & OwnProps;

class MakePin extends React.Component<MakePinProps> {
    public onSubmit = async () => {
        const { 
            WriteActions, 
            CommonActions,
            tags, 
            relationUrl, 
            body, 
            urls, 
            pinId,
            form,
            history,
            GroupActions,
        } = this.props;

        try {
            if (pinId && form) {
                await WriteActions.editPin({
                    id: pinId,
                    relationUrl,
                    body,
                    urls,
                    tags,
                })
                this.props.history.push(`/pin/${this.props.pinId}`);
                WriteActions.initialState();
                return;
            };

            await WriteActions.writeSubmit({
                tags,
                body,
                urls,
                relationUrl
            });
            await CommonActions.sendMessage('새 핀을 작성')
            history.push(`/pin/${this.props.pinId}`);
            WriteActions.initialState();
            GroupActions.setGroupPin(true);
        } catch (e) {
            console.log(e);
        }
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
        const { WriteActions } = this.props;
        WriteActions.removeTag(tag)
    };

    public onChangeInput = (e: any) => {
        const { value, name } = e.target;
        const { WriteActions } = this.props;
        WriteActions.changeInput({ name, value });
    }

    public render() {
        const { 
            body, 
            relationUrl,
            tags, 
            urls,
            pinId
        } = this.props;

        const { 
            onInsertTag, 
            onRemoveTag, 
            onDrop, 
            onPasteImage, 
            onUploadClick, 
            onChangeInput,
            onRemoveUrl,
            onSubmit, 
        } = this;
        
        return (
            <WriteForm 
                id={pinId}
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
                onChange={onChangeInput}
                body={body}
                urls={urls}
                relationUrl={relationUrl}
                onRemoveUrl={onRemoveUrl}
                onSubmit={onSubmit}
            />
        )
    }
}

const mapStateToProps = ({ base, write }: StoreState) => ({
    size: base.size,
    body: write.form.body,
    relationUrl: write.form.relation_url,
    tags: write.form.tags,
    urls: write.form.urls,
    pinId: write.pinId,
    form: write.form,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
    WriteActions: bindActionCreators(writeCreators, dispatch),
    CommonActions: bindActionCreators(commonCreators, dispatch),
    GroupActions: bindActionCreators(groupCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(MakePin);