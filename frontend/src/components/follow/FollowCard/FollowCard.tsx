import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./FollowCard.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string,
    thumbnail: string,
    displayName: string
}

const FollowCard: React.SFC<Props> = ({ displayName, thumbnail }) => {
    return (
        <div className={cx('follow-card')}>
            <div className={cx('wrapper')}>
                <Link to={`/@${displayName}`} className={cx('profile-group')}>
                    <div className={cx('profile')}>
                        <div className={cx('thumbnail-wrapper')}>
                            <div className={cx('wrapper')}>
                                <div className={cx('thumbnail')} >
                                    <img src={thumbnail} alt="thumbnail"/>
                                </div>
                            </div>
                        </div>
                        <div className={cx('info-wrapper')}>
                            <div className={cx('wrapper')}>
                                <div className={cx('displayName')}>{displayName}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={cx('btn-group')}>
                {
                    <div className={cx('button-wrapper')}>
                        <Link to={`/@${displayName}`}>
                            <button className={cx('button')}>
                                <div className={cx('profile-button')}>프로필로 이동하기</div>
                            </button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default FollowCard;