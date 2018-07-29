import * as React from 'react';
import * as classNames from 'classnames/bind';
import Spinner from '../Spinner';

const styles = require('./Loading.scss');
const cx = classNames.bind(styles);

const Loading = () => {
    return (
        <div className={cx('loading-template')}>
            <Spinner />
        </div>
    )
}

export default Loading;