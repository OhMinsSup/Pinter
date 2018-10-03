import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const ImageIcon = require('react-icons/lib/io/image');
const styles = require('./GroupCard.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string,
    cover: string,
    title: string,
    contents: string,
    displayName: string,
    thumbnail: string,
}

const GroupCard: React.SFC<Props> = ({ id, cover, title, contents, displayName, thumbnail }) => {

    return (
        <div className={cx('group-card')}>
            <Link to={`/group/@${id}/recent`} className={cx('cover-wrapper')}>
            {cover ? (
                <img src={cover} alt={displayName} />
            ) : (
                <div className={cx("image-placeholder")}>
                    <ImageIcon />
                </div>
            )}
            <div className={cx('white-mask')} />
            </Link>
            <div className={cx('card-content')}>
            <div className={cx('user-thumbnail-wrapper')}>
                <img src={thumbnail} alt={displayName} />
            </div>
            <div className={cx('content-head')}>
                <div className={cx('username')}>{displayName}</div>
                <h3>
                    <Link to='/'>{title}</Link>
                </h3>
            </div>
            <div className={cx('description')}>{contents}</div>
            </div>
        </div>
    )
}

export default GroupCard;