import * as React from 'react';
import GroupHeader from '../../components/group/GroupHeader';
import { StoreState } from '../../store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import GroupMenuContaienr from './GroupMenuContainer';
import { baseCreators } from '../../store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type GroupHeaderContainerProps = StateProps & DispatchProps;

class GroupHeaderContainer extends React.Component<GroupHeaderContainerProps> {
    public onResize = throttle(() => {
        const { BaseActions } = this.props;
        BaseActions.getbowserSize(document.body.scrollWidth);
    }, 250);
    
    public constructor(props: GroupHeaderContainerProps) {
        super(props);
        this.props.BaseActions.getbowserSize(document.body.scrollWidth);
    } 

    public componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    public render() {
        const { thumbnail, displayName, size } = this.props;
        return (
            <GroupHeader 
                thumbnail={thumbnail}
                displayName={displayName}
                size={size}
                menu={<GroupMenuContaienr />}
            />
        )
    }
}

const mapStateToProps = ({ user, base }: StoreState) => ({
    user: user.user && user.user,
    displayName: user.user && user.user.displayName,
    thumbnail: user.user && user.user.thumbnail,
    size: base.size,
});

const  mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseActions: bindActionCreators(baseCreators, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupHeaderContainer);

