import * as React from 'react';
import WriteSettingBox from '../../components/write/WriteSettingBox';
import WriteSettingGroupItemList from '../../components/write/WriteSettingGroupItemList';

class SettingPinBox extends React.Component<{}> {
    public render() {
        return (
            <WriteSettingBox>
                <WriteSettingGroupItemList />
            </WriteSettingBox>
        )
    }
}

export default SettingPinBox;