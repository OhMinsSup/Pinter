import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../store/modules';
import UserSettingProfile from '../../components/user/UserSettingProfile';
import UserSettingTemplate from '../../components/user/UserSettingTemplate';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type UserProfileSettingProps = StateProps & DispatchProps;

class UserProfileSetting extends React.Component<UserProfileSettingProps> {
    public render() {
        return (
            <UserSettingTemplate>
                <UserSettingProfile
                    thumbnail="https://benefitlombard.eu/images/no-image.jpg"
                    onCancel={() => console.log()}
                    displayName="veloss"
                />
            </UserSettingTemplate>
        );
    }
}

const mapStateToProps = ({  }: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileSetting);