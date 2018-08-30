import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { baseCreators } from '../../store/modules/base';
import { StoreState } from '../../store/modules';
import BoxTemplate from '../../components/box/BoxTemplate/BoxTemplate';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type ActionUserListProps = StateProps & DispatchProps;

class ActionUserList extends React.Component<ActionUserListProps> {
    public onActionBox = () => {
       const { BaseAction, theme } = this.props;
       BaseAction.setBox({
           id: '',
           name: theme,
           theme: '',
           visible: false
       }) 
    }

    public render() {
        const { onActionBox } = this;
        return (
            <BoxTemplate onAction={onActionBox}>
                박스
            </BoxTemplate>
        );
    }
}

const mapStateToProps = ({ base }: StoreState) => ({
    like: base.box.like,
    comment: base.box.comment,
    save: base.box.save,
    theme: base.box.theme,
    pinId: base.box.pinId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    BaseAction: bindActionCreators(baseCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ActionUserList);