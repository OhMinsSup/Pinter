import * as React from 'react';
import * as classNames from 'classnames/bind';
import Logo from '../Logo';
import SearchInput from '../SearchInput';

const styles = require('./Header.scss');
const cx = classNames.bind(styles);

type Props = { 
    right: React.ReactNode
}

const Header: React.SFC<Props> = ({ right }) => {
  return (
        <div className={cx('header')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('wrapper')}>
                    <Logo />
                    <SearchInput />
                    { right }
                </div>
            </div>
        </div>
    )
};

export default Header;
