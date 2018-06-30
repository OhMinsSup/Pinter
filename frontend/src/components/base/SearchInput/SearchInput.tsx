import * as React from 'react';
import * as classNames from 'classnames/bind';

const SearchIcon = require('react-icons/lib/fa/search');
const styles = require('./SearchInput.scss');
const cx = classNames.bind(styles);

type Props = { }

const SearchInput: React.SFC<Props> = () => {
  return (
        <div className={cx('search-input-wrapper')}>
            <div className={cx('wrapper')}>
                <div className={cx('flex-wrapper')}>
                    <div className={cx('search')}>
                        <div className={cx('input-wrapper')}>
                            <div className={cx('icons')}>
                                <SearchIcon />
                            </div>
                            <div className={cx('input')}>
                                <input className={cx('search-box-input')} maxLength={500} placeholder="검색" type="text"/>
                            </div>
                        </div>
                        <div className={cx('blank')} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SearchInput;
