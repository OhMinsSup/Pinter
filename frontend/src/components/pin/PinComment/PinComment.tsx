import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

const styles = require('./PinComment.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string,
    text: string,
    createdAt: string,
    tagName: string[],
    userId: string,
    username: string,
    displayName: string,
    thumbnail: string
}

const PinComment: React.SFC<Props> = ({ text, createdAt, tagName, username, displayName, thumbnail }) => {
    const tagList = tagName.map(
        tag => <Link className={cx('tags')} key={tag} to='/'>{tag}</Link>
    );
    return (
        <div className={cx('comment')}>
            <div className={cx('comment-header')}>
                <img className={cx('thumbnail')} src={thumbnail} alt={username}/>
                <div className={cx('username')}>@{displayName}</div>
                <div className={cx('date')}>{moment(createdAt).format('ll')}</div>
            </div>
            <p>{text}</p>
            <div>
                {tagList}
            </div>
        </div>
    );
}

export default PinComment;