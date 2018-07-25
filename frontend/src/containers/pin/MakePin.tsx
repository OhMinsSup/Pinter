import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { StoreState } from '../../store/modules';
import PinTemplate from '../../components/pin/PinTemplate';
import FormPin from '../../components/pin/FormPin';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type MakePinProps = StateProps & Dispatch;

class MakePin extends React.Component<MakePinProps> {
    public render() {
        const { visible } = this.props;
        if (!visible) return null;

        return (
            <PinTemplate>
                <FormPin />
            </PinTemplate>
        )
    }
}

const mapStateToProps = ({ pin }: StoreState) => ({
    visible: pin.visible
})

const mapDispatchToProps = (dispatch: Dispatch) => ({

})

export default compose(
    connect<StateProps, DispatchProps>(
        mapStateToProps,
        mapDispatchToProps
    )
)(MakePin);