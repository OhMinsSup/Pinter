import * as React from 'react';
import { StoreState } from '../../store/modules';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { id: string };
type GroupPinListProps = StateProps & DispatchProps & OwnProps;

class GroupPinList extends React.Component<GroupPinListProps> {
    public render() {
        return (
            <div>리스트</div>
        )
    }
}

const mapStateToProps = ({  }: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(GroupPinList);