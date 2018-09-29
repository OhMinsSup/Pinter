import * as React from 'react';
import GroupCardList from '../../components/group/GroupCardList';
import GroupMobileNav from '../../components/group/GroupMobileNav';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type MainGroupProps = StateProps & DispatchProps;

class MainGroup extends React.Component<MainGroupProps> {
    public render() {
        const { size } = this.props;
        return (
            <React.Fragment>
                <GroupMobileNav size={size}/>
                <GroupCardList />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ base }: StoreState) => ({
    size: base.size,
});

const  mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainGroup);