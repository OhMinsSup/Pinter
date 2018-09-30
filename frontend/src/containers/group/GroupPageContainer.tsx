import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import GroupCardList from '../../components/group/GroupCardList';
import GroupCommonNav from '../../components/group/GroupCommonNav';
import { StoreState } from '../../store/modules';
import { baseCreators } from '../../store/modules/base';
import { connect } from 'react-redux';
import GroupPageInfo from '../../components/group/GroupPageInfo';
import GroupPageNav from '../../components/group/GroupPageNav';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type GroupPageContainerProps = StateProps & DispatchProps;

class GroupPageContainer extends React.Component<GroupPageContainerProps> {
    public render() {
        const { size } = this.props;
        return (
            <React.Fragment>
                <GroupCommonNav size={size}/>
                <GroupPageInfo />
                <GroupPageNav />
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

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(GroupPageContainer);