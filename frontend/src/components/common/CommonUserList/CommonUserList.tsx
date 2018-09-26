import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./CommonUserList.scss');
const cx = classNames.bind(styles);

type Props = {
    id: string,
    username: string,
    displayName: string,
    thumbnail: string,
}

type CommonUserListProps = {
    users: any[],
}

const CommonCard: React.SFC<Props> = ({ displayName, thumbnail }) => {
    return (
        <div className={cx('common-card')}>
            <div className={cx('wrapper')}>
                <Link to="/" className={cx('profile-group')}>
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

const CommonUserList: React.SFC<CommonUserListProps> = ({ users }) => {
    const usersList = users.map(
        (user) => {
            const { user: { _id, username, displayName, thumbnail } } = user;
            console.log(username, displayName, thumbnail);
            
            return (
                <CommonCard
                    key={_id}
                    id={_id}
                    username={username}
                    displayName={displayName}
                    thumbnail={thumbnail}
                />
            )
        }
    )
    return (
        <div className={cx('common-user-list')}>
            {usersList}
        </div>
    )
}

export default CommonUserList;