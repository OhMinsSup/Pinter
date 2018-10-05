import * as React from 'react';
import WriteSettingBox from '../../components/write/WriteSettingBox';
import WriteSettingGroupItemList from '../../components/write/WriteSettingGroupItemList';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type SettingPinBoxProps = StateProps & DispatchProps;

class SettingPinBox extends React.Component<SettingPinBoxProps> {
    public render() {
        const { setting } = this.props;

        if (!setting) return null;
        
        return (
            <WriteSettingBox>
                <WriteSettingGroupItemList />
            </WriteSettingBox>
        )
    }
}

const mapStateToProps = ({ write }: StoreState) => ({
    setting: write.setting.visible,
});

const mapDispatchToProps = () => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingPinBox);