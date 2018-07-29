import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./FakeCard.scss');
const cx = classNames.bind(styles);

const FakeCard = () => {
    return (
        <div className={cx('fake-card')}>dsdss</div>
    );
}

export default FakeCard;