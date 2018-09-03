import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const styles = require('./UserHeader.scss');
const cx = classNames.bind(styles);

type Props = {
    username: any,
    displayName: any,
    profile: any,
    follow: boolean,
    onClick(): void,
    onSetting(): void,
    onFollow(): Promise<void>
}

const UserHeader: React.SFC<Props> = ({ 
    username,
    displayName,
    follow, 
    onClick, 
    profile, 
    onSetting, 
    onFollow 
}) => {    
    return (
        <div className={cx('user-header')}>
            <img src={profile.thumbnail} alt="thumbnail" />
            <div className={cx('user-info')}>
                <section className={cx('top')}>
                    {
                        <div className={cx('subscribe-wrapper')}>
                            <Button className={cx('setting')} theme="outline" onClick={onClick}>
                                글쓰기
                            </Button>
                            {
                                (username === profile.username) && (displayName === profile.displayName) ? (
                                    <Button className={cx('setting')} theme="outline" onClick={onSetting}>
                                        프로필
                                    </Button>  
                                ) : null
                            }                           
                            {
                                follow ? (
                                    <Button className={cx('subscribe')} theme="default" onClick={onFollow}>
                                        구독중
                                    </Button>
                                ) : (
                                    <Button className={cx('subscribe')} theme="outline" onClick={onFollow}>
                                        구독하기
                                    </Button>
                                )
                            }
                        </div>
                        
                    }
                    <div className={cx('username')}>@{profile.username}</div>
                </section>
                <section className={cx('mini-profile')}>
                    <h2>@{profile.displayName}</h2>
                    <div className={cx('content-wrapper')}>
                        <p className={cx('count')}>팔로잉&nbsp;{profile.following}&nbsp;</p>
                        <p className={cx('count')}>팔로우&nbsp;{profile.follower}&nbsp;</p>
                        <p className={cx('count')}>핀&nbsp;{profile.pin}&nbsp;</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
export default UserHeader;