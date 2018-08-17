import * as React from 'react';
import * as classNames from 'classnames/bind';
import Textarea from "react-textarea-autosize";

const styles = require('./CommentInput.scss');
const cx = classNames.bind(styles);

type Props = {
    value: string,
    onChange(e: any): void,
    onKeyPress(e: any): void
}

const CommentInput: React.SFC<Props> = ({ value, onChange, onKeyPress }) => {
    return (
        <div className={cx('comment')}>
            <Textarea
                className={cx('comment-box')}
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                placeholder="Add a Comment..."
            />
        </div>
    );
}

export default CommentInput;