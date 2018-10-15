import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { StoreState } from '../../store/modules';
import SearchHeader from '../../components/search/SearchHeader';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<string> };

type SearchNavHeaderProps = StateProps & DispatchProps & OwnProps;

class SearchNavHeader extends React.Component<SearchNavHeaderProps> {
  public render() {
    const { match } = this.props;
    return <SearchHeader url={match.url} />;
  }
}

const mapStateToProps = ({  }: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchNavHeader);
