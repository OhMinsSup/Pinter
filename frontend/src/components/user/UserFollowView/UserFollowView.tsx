import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../../lib/common';

const LabelIcon = require('react-icons/lib/md/label');
const styles = require('./UserFollowView.scss');
const cx = classNames.bind(styles);

type Props = {
    tab: string,
    cursor: boolean,
    followDatas: any[],
    onSelectTab(value: string): void,
    onUserMore(value: boolean): void,
}

const ViewTitleItem: React.SFC<{
    active: boolean,
    value: string,
    title: string,
    onSelectTab(value: string): void,
}> = ({ active, onSelectTab, value, title }) => (
    <span className={cx('title', { active })} onClick={() => onSelectTab(value)}>{title}</span>
)

const UserFollowView: React.SFC<Props> = ({ followDatas, onSelectTab, tab, onUserMore, cursor }) => {
    return (
        <div className={cx('user-follow-view')}>
            <section>
            <div className={cx('section-title')}>
                <LabelIcon />
                    <ViewTitleItem 
                        active={tab === 'follow'}
                        value="follow"
                        title="팔로우"
                        onSelectTab={onSelectTab}
                    />
                    <ViewTitleItem 
                        active={tab === 'following'}
                        value="following"
                        title="팔로잉"
                        onSelectTab={onSelectTab}
                    />
                </div>
                {followDatas && (
                    <ul>
                        <li>
                            <span onClick={() => onUserMore(cursor)}>
                                전체보기
                            </span>
                        </li>
                        <li className={cx('placer')} />
                        {followDatas.map((f,i) => {
                            const {
                                username,
                                thumbnail,
                                displayName
                            } = f;
                            return (
                                <li key={i}>
                                    <span className={cx('active')}>
                                        <div className={cx('cover')}>
                                            <Link to={`/@${displayName}`} className={cx('link')}>
                                                <img src={thumbnail} alt={username}/>
                                            </Link>
                                            <span>{escapeForUrl(displayName)}</span>
                                        </div>
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>
        </div>
    )
}

export default UserFollowView;