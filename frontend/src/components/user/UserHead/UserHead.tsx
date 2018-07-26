import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';
import UserMenuItem from '../UserMenuItem';

const styles = require('./UserHead.scss');
const cx = classNames.bind(styles);

type Props = {
    username: string | any,
    displayName: string | any,
    thumbnail: string | any,
    url: string,
    onPinScreen(): any,
    onSettingScreen(): any
 }

const UserHead: React.SFC<Props> = ({ username, displayName, thumbnail, url, onPinScreen, onSettingScreen }) => {    
    return (
        <div className={cx('user-head')}>
            <img src={thumbnail} alt={username}/>
            <div className={cx('user-info')}>
                <section className={cx('top')}>
                    <div className={cx('wrapper')}>
                        <Button className={cx('profile-setting')} theme="outline">
                            보드 만들기
                        </Button>
                        <Button className={cx('profile-setting')} theme="outline" onClick={onPinScreen}>
                            작성하기
                        </Button>
                        <Button className={cx('profile-setting')} theme="outline" onClick={onSettingScreen}>
                                프로필 편집
                        </Button>
                        <Button className={cx("subscribe")} theme="outline">
                            구독하기
                        </Button>
                    </div>
                    <div className={cx('username')}>{username}</div>
                </section>
                <section className={cx('mini-profile')}>
                    <h2>@{displayName}</h2>
                    <div className={cx('content-wrapper')}>
                        <p className={cx('count')}>팔로잉&nbsp;5&nbsp;</p>
                        <p className={cx('count')}>팔로우&nbsp;5&nbsp;</p>
                        <p className={cx('count')}>게시글&nbsp;5&nbsp;</p>
                    </div>
                </section>
                <section className={cx('nav-menu-itmes')}>
                    <UserMenuItem
                        text="핀"
                        active={url === `/@${displayName}/pin`}
                        to={`/@${displayName}/pin`}
                    />
                    <UserMenuItem
                        text="보드"
                        active={url === `/@${displayName}/board`}
                        to={`/@${displayName}/board`}
                    />
                    <UserMenuItem
                        text="팔로우"
                        active={url === `/@${displayName}/follower`}
                        to={`/@${displayName}/follower`}
                    />
                    <UserMenuItem
                        text="팔로잉"
                        active={url === `/@${displayName}/following`}
                        to={`/@${displayName}/following`}
                    />
                    <UserMenuItem
                        text="보관함"
                        active={url === `/@${displayName}/saves`}
                        to={`/@${displayName}/saves`}
                    />
                </section>
            </div>
        </div>
    );
}

export default UserHead;

