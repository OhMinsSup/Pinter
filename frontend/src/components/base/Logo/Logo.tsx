import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';

const styles = require('./Logo.scss');
const cx = classNames.bind(styles);

type Props = {}

const Logo: React.SFC<Props> = () => {
    return (
        <div className={cx('logo-wrapper')}>
            <Link to="/" className={cx('logo')}>
                <span>Pinter</span>
            </Link>
        </div>
    );
}

export default Logo;