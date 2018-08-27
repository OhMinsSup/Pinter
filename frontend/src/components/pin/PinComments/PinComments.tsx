import * as React from 'react';
import * as classNames from'classnames/bind';
import * as moment from 'moment';
import { Link } from 'react-router-dom';

const styles = require('./PinComments.scss');
const cx = classNames.bind(styles);

type Props = {
}

let comments = [
    { 
        text: 'tessd', 
        username: 'veloss', 
        thumbnail: 'https://pbs.twimg.com/profile_images/1012762345238454272/Q9jiI1pL_bigger.jpg',
        createAt: '2018-06-20',
        tags: ["dsds", "dsss", "wewe"]
    },
    { 
        text: 'tessd', 
        username: 'veloss', 
        thumbnail: 'https://pbs.twimg.com/profile_images/1012762345238454272/Q9jiI1pL_bigger.jpg',
        createAt: '2018-06-20',
        tags: ["dsds", "dsss", "wewe"]
    }
]

const Comment:React.SFC<{ 
    text: string, 
    thumbnail: string, 
    username: string, 
    createdAt: string, 
    tags: string[] 
}> = ({ text, thumbnail, username, createdAt, tags }) => {
    const tagList = tags.map(
        (tag: string) => <Link className={cx('tags')} key={tag} to='/'>{tag}</Link>
    );    
    return(
        <div className={cx('comment-item')}>
            <div className={cx('comment-header')}>
                <img className={cx('thumbnail')} src={thumbnail} alt="thumbnail"/>
                <div className={cx('username')}>@{username}</div>
                <div className={cx('date')}>{moment(createdAt).format('ll')}</div>
            </div>
            <p>{text}</p>
            <div>
                {tagList}
            </div>
        </div>
    )
}

const PinComments: React.SFC<Props> = ({ }) => {
    const commentList = (comments as any[]).map(
        (comment, index) => {
            const { username, text, thumbnail, createdAt, tags } = comment;
            return (
                <Comment 
                    text={text}
                    username={username}
                    thumbnail={thumbnail}
                    createdAt={createdAt}
                    tags={tags}
                    key={index}
                />
            );
        }
    )
    return (
        <div className={cx('pin-comments')}>
            { commentList }
        </div>
    );
}



export default PinComments;
