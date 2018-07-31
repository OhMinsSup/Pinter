import * as React from 'react';
import * as classNames from 'classnames/bind';
import Textarea from "react-textarea-autosize";

const styles = require('./PinComment.scss');
const cx = classNames.bind(styles);

const PinComment = () => {
    return (
        <div className={cx('pin-comment')}>
            <Textarea
                className={cx('comment-box')}
                placeholder="Add a Comment..."
            />
        </div>
    );
}

export default PinComment;