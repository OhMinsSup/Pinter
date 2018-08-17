import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./PinComment.scss');
const cx = classNames.bind(styles);

type Props = {}

const PinComment: React.SFC<Props> = () => {
    const tags = ['a', 'b', 'c' , 'd'];
    const tagList = tags.map(
        tag => <Link className={cx('tags')} key={tag} to='/'>{tag}</Link>
    );
    return (
        <div className={cx('comment')}>
            <div className={cx('comment-header')}>
                <img className={cx('thumbnail')} src="https://c.disquscdn.com/uploads/users/19534/9041/avatar92.jpg?1481015527" alt="thumbnail"/>
                <div className={cx('username')}>@veloss</div>
                <div className={cx('date')}>2015.3.23</div>
            </div>
            <p>내용</p>
            <div>
                {tagList}
            </div>
        </div>
    );
}

export default PinComment;