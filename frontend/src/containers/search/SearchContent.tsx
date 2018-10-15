import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { StoreState } from '../../store/modules';
import SearchInput from '../../components/search/SearchInput';
import { commonCreators } from '../../store/modules/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

type SearchContentProps = StateProps & DispatchProps;

class SearchContent extends React.Component<SearchContentProps> {
  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { CommonActions } = this.props;
    const { value } = e.target;
    CommonActions.changeSearchValue(value);
  };

  public render() {
    const { value } = this.props;
    const { onChange } = this;

    return <SearchInput value={value} onChange={onChange} />;
  }
}

const mapStateToProps = ({ common }: StoreState) => ({
  value: common.value,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  CommonActions: bindActionCreators(commonCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(SearchContent);

/*
  public onSearchPin = throttle(async(value: string) => {
    const { CommonActions } = this.props;
    try {
      await CommonActions.searchPin(value);
    } catch (e) {
      console.error(e);
    }
  }, 750);

  public onSearchUser = throttle(async(value: string) => {
    const { CommonActions } = this.props;
    try {
      await CommonActions.searchUser(value);
    } catch (e) {
      console.error(e);
    }
  }, 750);

  public onSearchTag = throttle(async(value: string) => {
    const { CommonActions } = this.props;
    try {
      await CommonActions.searchTag(value);
    } catch (e) {
      console.error(e);
    }
  }, 750);

*/
