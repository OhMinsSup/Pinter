import * as React from 'react';
import WrtieGroupPane from '../../components/group/WrtieGroupPane/WrtieGroupPane';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { connect } from 'react-redux';
import { groupWrtieCreatros } from '../../store/modules/group/write';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type WriteGroupContainerProps = StateProps & DispatchProps;

class WriteGroupContainer extends React.Component<WriteGroupContainerProps> {
    public onChangeInput = (e: any) => {
        const { GroupAction } = this.props;
        const { value, name } = e.target;
        console.log(value, name);
        
        GroupAction.changeInput({ name, value });
    }

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

    public render() {
        const { title, description, coverThumbnail } = this.props;
        const { onChangeInput, onUploadClick } = this;
        return (
            <WrtieGroupPane
                title={title}
                thumbnail={coverThumbnail}
                description={description}
                onChangeInput={onChangeInput}
                onUploadClick={onUploadClick}
            />
        )
    }
}

const mapStateToProps = ({ group }: StoreState) => ({
    title: group.groupWrite.form.title,
    description: group.groupWrite.form.description,
    coverThumbnail: group.groupWrite.form.coverThumbnail,
    visibility: group.groupWrite.form.visibility,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    GroupAction: bindActionCreators(groupWrtieCreatros, dispatch),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(WriteGroupContainer);