import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import LandingTemplate from '../../components/landing/LandingTemplate';

type Props = {
    form: React.ReactNode
}

class LandingTemplateContainer extends React.Component<Props> {
    public render() {
        const { form } = this.props;
        return <LandingTemplate form={form}/>;
    }
}

export default connect(
    ({  }: StoreState) => ({

    })
)(LandingTemplateContainer);