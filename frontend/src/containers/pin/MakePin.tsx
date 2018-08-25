import * as React from 'react';
import WriteTemplate from '../../components/write/WriteTemplate';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import WriteForm from '../../components/write/WriteForm';
import InputTags from '../../components/write/InputTags';
import DropImage from '../../components/write/DropImage';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type MakePinProps = StateProps & DispatchProps

class MakePin extends React.Component<MakePinProps> {
    public onCloseBox = () => {
        const { BaseActions } = this.props;
        BaseActions.openPinBox(false);
    }

    public uploadUrl = async (file: any) => {
        console.log(file);
        
    }

    public uploadRemove = () => {
        console.log('gkgk');
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
        console.log('gkgk');
    }

    public onRemoveTag = (tag: string) => {
        console.log('gkgk');
    };

    public render() {
        const { visible, size } = this.props;
        const { onInsertTag, onRemoveTag, onDrop, onPasteImage, onUploadClick, onCloseBox } = this;

        if (!visible) return null;
        return (
            <WriteTemplate
                size={size}
                onClick={onCloseBox}
            >
                <WriteForm 
                    inputTags={<InputTags
                        tags={['tag', 'tags', 'hey']}
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
                />
            </WriteTemplate>
        )
    }
}

const mapStateToProps = ({ base }: StoreState) => ({
    visible: base.pin.visible,
    size: base.size,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch)
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(MakePin);