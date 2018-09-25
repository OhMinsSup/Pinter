import * as React from 'react';
import * as classNames from 'classnames/bind';

const SearchIcon = require('react-icons/lib/fa/search');
const styles = require('./SearchInput.scss');
const cx = classNames.bind(styles);

type Props = {
  type: string,
  onSearchPin(value: string, type: string): Promise<any>
}

type State = {
  search: string,
  type: string
}

class SearchInput extends React.Component<Props, State> {
  public state = {
    search: '',
    type: 'body',
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, onSearchPin } = this.props;
    const searchType = type === 'search' ? 'pin' : type;
    
    this.setState({
      search: e.target.value
    });

    if (searchType === 'pin') {
      onSearchPin(this.state.search, this.state.type);
    } else if (searchType === 'user'){
      console.log('유저');
    } else if (searchType === 'tag') {
      console.log('태그');
    }
  }

  public render() {
    const { onChange } = this;
    const { search } = this.state;
    return (
      <div className={cx('search-input')}>
        <SearchIcon className={cx('icons')}/>
        <input className={cx('input')} placeholder="검색" value={search} onChange={onChange}/>
      </div>
    );
  }
} 


export default SearchInput;