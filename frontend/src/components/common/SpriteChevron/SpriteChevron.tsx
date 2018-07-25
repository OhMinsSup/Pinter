import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SpriteChevron.scss');
const cx = classNames.bind(styles);

const SpriteChevron = () => {
    return (
        <div className={cx('sprite-chevron')}>
            <div className={cx('next', 'test')}/>
            <div className={cx('next')}/>
        </div>
    );
}

export default SpriteChevron;