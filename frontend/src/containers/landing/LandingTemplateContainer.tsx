import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/modules';
import LandingTemplate from '../../components/landing/LandingTemplate';

type StateProps = ReturnType<typeof mapStateToProps>;
type OwnProps = {
  form: React.ReactNode;
};

type Props = StateProps & OwnProps;

class LandingTemplateContainer extends React.Component<Props> {
  public render() {
    if (this.props.user) return null;

    const { form } = this.props;
    return <LandingTemplate form={form} />;
  }
}

const mapStateToProps = ({ user }: StoreState) => ({
  user: user.user && user.user,
});

export default connect<StateProps, OwnProps>(mapStateToProps)(
  LandingTemplateContainer
);
