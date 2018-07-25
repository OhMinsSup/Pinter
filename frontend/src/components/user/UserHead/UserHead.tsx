import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';
import UserMenuItem from '../UserMenuItem';

const styles = require('./UserHead.scss');
const cx = classNames.bind(styles);

type Props = { }

const UserHead: React.SFC<Props> = ({  }) => {
    return (
        <div className={cx('user-head')}>
            <img src="https://c.disquscdn.com/uploads/users/19534/9041/avatar92.jpg?1481015527" alt="username"/>
            <div className={cx('user-info')}>
                <section className={cx('top')}>
                    <div className={cx('wrapper')}>
                        <Button className={cx('profile-setting')} theme="outline">
                            보드 만들기
                        </Button>
                        <Button className={cx('profile-setting')} theme="outline">
                            작성하기
                        </Button>
                        <Button className={cx('profile-setting')} theme="outline">
                            프로필 편집
                        </Button>
                        <Button className={cx("subscribe")} theme="outline">
                            구독하기
                        </Button>
                    </div>
                    <div className={cx('username')}>오민섭</div>
                </section>
                <section className={cx('mini-profile')}>
                    <h2>@veloss</h2>
                    <p>풀스택 개발자</p>
                    <div className={cx('content-wrapper')}>
                        <p className={cx('count')}>팔로잉&nbsp;5&nbsp;</p>
                        <p className={cx('count')}>팔로우&nbsp;5&nbsp;</p>
                        <p className={cx('count')}>게시글&nbsp;5&nbsp;</p>
                    </div>
                </section>
                <section className={cx('nav-menu-itmes')}>
                    <UserMenuItem
                        text="핀"
                        to="/"
                    />
                    <UserMenuItem
                        text="보드"
                        to="/"
                    />
                    <UserMenuItem
                        text="팔로우"
                        to="/"
                    />
                    <UserMenuItem
                        text="팔로잉"
                        to="/"
                    />
                    <UserMenuItem
                        text="보관함"
                        to="/"
                    />
                </section>
            </div>
        </div>
    );
}

export default UserHead;

