
import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

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
                            <Link to="/search" className={cx('input')}>
                                <div className={cx('search-box-input')} />
                            </Link>
                        </div>
                        <div className={cx('blank')} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SearchInput;