import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { actionCreators as settingActions } from '../../store/modules/setting';
import SettingTemplate from '../../components/setting/SettingTemplate';
import SettingProfile from '../../components/setting/SettingProfile';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type SettingProfileContainerProps = StateProps & DispatchProps;

class SettingProfileContainer extends React.Component<SettingProfileContainerProps> {
    public onCancel = () => {
        const { SettingActions } = this.props;
        SettingActions.setProfileFullscreenLoader(false);
    }

    public render() {
        // TODO 나중에 프로필 값을 따로 불러와서 수정해야한다. user로 가져오지 말고
        const { visible, thumbnail, displayName } = this.props;
        const { onCancel } = this;
        if (!visible) return null;
        return (
            <SettingTemplate>
                <SettingProfile 
                    thumbnail={thumbnail}
                    onCancel={onCancel}
                    displayName={displayName}
                />
            </SettingTemplate>
        );
    }
}

const mapStateToProps = ({ setting, user }: StoreState) => ({
    thumbnail: user.user && user.user.thumbnail,
    displayName: user.user && user.user.displayName,
    visible: setting.visible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    SettingActions: bindActionCreators(settingActions, dispatch)
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(SettingProfileContainer);