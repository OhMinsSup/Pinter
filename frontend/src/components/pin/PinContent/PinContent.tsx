import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../../lib/common';
import PinItem from '../PinItem';

const SaveIcon = require('react-icons/lib/fa/bookmark-o');
const LikeIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const styles = require('./PinContent.scss');
const cx = classNames.bind(styles);

type Props = {
    images?: string[],
    tags?: string[],
}

const PinContent:React.SFC<Props> = ({ images, tags }) => {
    const imageList = (images as string[]).map((image, index) => {
        return (
            <div key={index} className={cx('image-containter')}>
                <div className={cx('images')}>
                    <div className={cx('image')}>
                        <img src={image} alt={image}/>
                    </div>
                </div>
            </div>
        )
    });

    const tagList = (tags as string[]).map((tag, index) => {
        return (
            <Link to={`/tags/${escapeForUrl(tag)}}`} key={index}>
                {tag}
            </Link>
        )
    });

    return (
        <div className={cx('pin-content')}>
            <p className={cx('body')}>
                content
                <span className={cx('relation-url')}>https://www.docker.com/</span>
            </p>
            {imageList}
            <div className={cx('content-footer')}>
                <div className={cx('action-list')}>
                    <PinItem
                        icons={<CommentIcon/>}
                        count={2}
                        type="comment"
                    />
                    <PinItem
                        icons={<LikeIcon/>}
                        count={3}
                        type="like"
                    />
                    <PinItem
                        icons={<SaveIcon/>}
                        count={5}
                        type="save"
                    />
                </div>
            </div>
            <div className={cx('tag-container')}>
                {tagList}
            </div>
        </div>
    )
}

PinContent.defaultProps = {
    images: [
        "https://pbs.twimg.com/media/DljDsXrXoAAk_rH.jpg",
    ],
    tags: [
        "tag",
        "hey",
        "ghgh"
    ]
}

export default PinContent;