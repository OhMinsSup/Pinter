import * as React from 'react';
import * as classNames from 'classnames/bind';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./FullScreenImage.scss');
const cx = classNames.bind(styles);

type Props = {}

const FullScreenImage: React.SFC<Props>  = ({  }) => {
    return (
        <div className={cx('fullscreen-image')}>
            <div className={cx('gallery-content')}>
                <button className={cx('cancel-button')}><CancelIcon /></button>
            </div>
        </div>
    )
} 


export default FullScreenImage;