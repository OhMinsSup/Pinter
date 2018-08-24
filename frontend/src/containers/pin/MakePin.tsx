import * as React from 'react';
import PinTemplate from '../../components/write/WriteTemplate';
import { StoreState } from '../../store/modules';
import { Dispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { baseCreators } from '../../store/modules/base';
import WriteForm from '../../components/write/WriteForm';
import InputTags from '../../components/write/InputTags';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type MakePinProps = StateProps & DispatchProps

class MakePin extends React.Component<MakePinProps> {
    public onCloseBox = () => {
        const { BaseActions } = this.props;
        BaseActions.openPinBox(false);
    }

    public onInsertTag = (tag: string) => {
        console.log('gkgk');
    }

    public onRemoveTag = (tag: string) => {
        console.log('gkgk');
    };

    public render() {
        const { visible } = this.props;

        if (!visible) return null;
        return (
            <PinTemplate
                onClick={this.onCloseBox}
            >
                <WriteForm 
                    inputTags={<InputTags
                        tags={['tag', 'tags', 'hey']}
                        onInsert={this.onInsertTag} 
                        onRemove={this.onRemoveTag}
                    />}
                />
            </PinTemplate>
        )
    }
}

const mapStateToProps = ({ base }: StoreState) => ({
    visible: base.pin.visible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch)
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(MakePin);