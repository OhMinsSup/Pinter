import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinComment from '../PinComment/PinComment';

const styles = require('./PinComments.scss');
const cx = classNames.bind(styles);

type Props = {}

const PinComments: React.SFC<Props> = () => {
    return(
        <div className={cx('pin-comments')}>
            <h4>0개의 댓글</h4>
            <div className={cx('comment-list')}>
                <PinComment />
            </div>
        </div>
    );
}

export default PinComments;
