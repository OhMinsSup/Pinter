import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const ImageIcon = require('react-icons/lib/io/image');
const styles = require('./GroupCard.scss');
const cx = classNames.bind(styles);

type Props = {

}

const GroupCard: React.SFC<Props> = () => {
    let cover = 'https://images.velog.io/post-images/velopert/65d87b10-c356-11e8-a7e2-57af7a25e2db/code-splitting.png';

    return (
        <div className={cx('group-card')}>
            <Link to='/' className={cx('cover-wrapper')}>
            {cover ? (
                <img src={cover} alt={'veloss'} />
            ) : (
                <div className={cx("image-placeholder")}>
                    <ImageIcon />
                </div>
            )}
            <div className={cx('white-mask')} />
            </Link>
            <div className={cx('card-content')}>
            <div className={cx('user-thumbnail-wrapper')}>
                <img src={'https://images.velog.io/thumbnails/veloss/43c665f0-b44c-11e8-b8f5-49cedc880031-DHxDbYmUwAASvCI.png'} alt={'veloss'} />
            </div>
            <div className={cx('content-head')}>
                <div className={cx('username')}>{'veloss'}</div>
                <h3>
                    <Link to='/'>그룹제목</Link>
                </h3>
            </div>
            <div className={cx('description')}>설명설명설명설명</div>
            </div>
        </div>
    )
}

export default GroupCard;