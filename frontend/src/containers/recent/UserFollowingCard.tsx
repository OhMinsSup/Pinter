import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from '../../store/modules';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {
    displayName: string
}
type UserFollowingCardProps = StateProps & DispatchProps & OwnProps;

class UserFollowingCard extends React.Component<UserFollowingCardProps> {
    public render() {
        return (
            <div>gkgk</div>
        );
    }
}

const mapStateToProps = ({ list }: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(UserFollowingCard);
