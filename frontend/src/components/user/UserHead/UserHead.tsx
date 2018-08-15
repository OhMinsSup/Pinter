import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';
import UserMenuItem from '../UserMenuItem';

const styles = require('./UserHead.scss');
const cx = classNames.bind(styles);

type Props = {
    username: string,
    displayName: string,
    thumbnail: string,
    follower: number,
    following: number,
    pin: number,
    id: string,
    userId: string | null,
    url: string,
    follow: boolean,
    onPinScreen(): any,
    onSettingScreen(): any
    onFollow(displayName: string): Promise<void>,
    onUnFollow(displayName: string): Promise<void>
 }

const UserHead: React.SFC<Props> = ({ userId, username, displayName, thumbnail,id, url, onFollow, onUnFollow, onPinScreen, onSettingScreen, follower, following, pin, follow }) => {    
    return (
        <div className={cx('user-head')}>
            <img src={thumbnail} alt={username}/>
            <div className={cx('user-info')}>
                <section className={cx('top')}>
                    <div className={cx('wrapper')}>
                        <Button className={cx('profile-setting')} theme="outline" onClick={onPinScreen}>
                            작성하기
                        </Button>
                        <Button className={cx('profile-setting')} theme="outline" onClick={onSettingScreen}>
                                프로필 편집
                        </Button>
                        <React.Fragment>
                            {   
                                userId === id ? null : (
                                    follow ? (
                                        <Button className={cx("subscribe")} theme="default" onClick={() => onUnFollow(displayName)}>
                                            구독중
                                        </Button>
                                    ) : (
                                        <Button className={cx("subscribe")} theme="outline" onClick={() => onFollow(displayName)}>
                                            구독하기
                                        </Button>
                                    )
                                )
                            }
                        </React.Fragment>
                    </div>
                    <div className={cx('username')}>{username}</div>
                </section>
                <section className={cx('mini-profile')}>
                    <h2>@{displayName}</h2>
                    <div className={cx('content-wrapper')}>
                        <p className={cx('count')}>팔로잉&nbsp;{following}&nbsp;</p>
                        <p className={cx('count')}>팔로우&nbsp;{follower}&nbsp;</p>
                        <p className={cx('count')}>핀&nbsp;{pin}&nbsp;</p>
                    </div>
                </section>
                <section className={cx('nav-menu-itmes')}>
                    <UserMenuItem
                        text="핀"
                        active={url === `/@${displayName}/pin`}
                        to={`/@${displayName}/pin`}
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

