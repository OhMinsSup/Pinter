import * as React from 'react';
import * as classNames from 'classnames/bind';
import { FaUser, FaBars } from 'react-icons/lib/fa';
import Logo from '../Logo';
import { escapeForUrl } from '../../../lib/common';
import SearchInput from '../SearchInput';
import Button from '../../common/Button';

const styles = require('./Header.scss');
const NoticeIcon = require('react-icons/lib/io/android-notifications');
const LogoutIcon = require('react-icons/lib/fa/sign-out');
const TagIcon = require('react-icons/lib/fa/tags');
const cx = classNames.bind(styles);

type Props = { 
    displayName: string | any,
    thumbnail: string | any,
    size: number,
    count: number,
    onLogout(): Promise<void>,
    onSidebar(): void,
    onNotice(): void,
}

const Header: React.SFC<Props> = ({ 
    displayName, 
    thumbnail, 
    onLogout, 
    size, 
    count,
    onSidebar,
    onNotice,
}) => {
    return (
        <React.Fragment>
        {   
            size <= 816 ? (
                <div className={cx('mobile-head')}>
                    <div className={cx('button-area')}>
                        <Button theme="outline" to='/write'>새 핀</Button>
                    </div>
                    <div className={cx('spacer')} />
                    <Logo />
                    <div className={cx('right-area')}>
                        <Button theme="noline" onClick={onSidebar}>
                            <FaBars/>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={cx('header')}>
                    <div className={cx('header-wrapper')}>
                        <div className={cx('wrapper')}>
                            <Logo />
                            <SearchInput />
                            <div className={cx('button-group')}>
                                <Button theme='noline' to='/tags'>
                                    <TagIcon className={cx('tag')}/>
                                </Button>
                                <Button theme='noline' to='/users'>
                                    <FaUser className={cx('users')}/>
                                </Button>
                                <Button theme='noline' to={`/@${escapeForUrl(displayName)}`}>
                                    <img className={cx('thumbnail')} src={thumbnail} alt={displayName}/>
                                    <span className={cx('username')}>{displayName}</span>
                                </Button>
                                <Button theme='noline' onClick={onNotice}>
                                    <NoticeIcon className={cx('notice')}/>
                                    {
                                        count === 0 || !count ? null : (
                                            <span className={cx('notice-count')} >
                                                {
                                                    count > 99 ? '99++' : count
                                                }
                                            </span>
                                        )
                                    }
                                </Button>
                                <Button theme='noline' onClick={onLogout}>
                                    <LogoutIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        </React.Fragment>
    )
};

export default Header;