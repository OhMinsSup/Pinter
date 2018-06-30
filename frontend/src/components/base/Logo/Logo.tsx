import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';

const PinterIcon = require('react-icons/lib/fa/pinterest');
const styles = require('./Logo.scss');
const cx = classNames.bind(styles);

type Props = {}

const Logo: React.SFC<Props> = () => {
    return (
        <div className={cx('logo-wrapper')}>
            <Link to="/" className={cx('logo')}>
                <div className={cx('nav-icons')}>
                    <div className={cx('icons')}>
                        <PinterIcon />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Logo;