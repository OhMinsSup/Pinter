import * as React from 'react';
import MakeGroupModal from 'src/components/group/MakeGroupModal';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { bindActionCreators, Dispatch } from 'redux';
import { groupCreators } from 'src/store/modules/group';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type MakePinGroupContainerProps = StateProps & DispatchProps;

class MakePinGroupContainer extends React.Component<MakePinGroupContainerProps> {
    public onClick = () => {
        const { GroupActions } = this.props;
        GroupActions.setMakeGroup(false)
    }

    public render() {
        const { visible } = this.props;
        const { onClick } = this;

        return (
            <MakeGroupModal 
                onClick={onClick}
                onOpen={visible}
            />
        )
    }
}

const mapStateToProps = ({ group }: StoreState) => ({
    visible: group.MakeModal.visible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    GroupActions: bindActionCreators(groupCreators, dispatch),
})

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(MakePinGroupContainer);