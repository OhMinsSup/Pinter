import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, compose, bindActionCreators } from 'redux';
import { withRouter, match } from 'react-router-dom';
import { StoreState } from '../../store/modules';
import SearchInput from '../../components/search/SearchInput';
import { commonCreators } from '../../store/modules/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<string> };

type SearchContentProps = StateProps & DispatchProps & OwnProps;

class SearchContent extends React.Component<SearchContentProps> {
  public onSearchPin = async (value: string, type: string) => {
    const { CommonActions } = this.props;
    try {
      await CommonActions.searchPin(value, type);
    } catch (e) {
      console.error(e);
    }
  }

  public render () {
    const { onSearchPin } = this;
    const { match } = this.props;
    const urlSplit = match.url.split("/");
    const type = urlSplit[urlSplit.length - 1];    
    return (
      <SearchInput
        onSearchPin={onSearchPin}
        type={type}
      />
    );
  }
}

const mapStateToProps = ({  }: StoreState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  CommonActions: bindActionCreators(commonCreators, dispatch),
});

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchContent);