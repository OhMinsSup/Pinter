import * as React from 'react';
import * as classNames from 'classnames/bind';
import { FaUser, FaBars } from 'react-icons/lib/fa';
import Logo from '../Logo';
import { escapeForUrl } from '../../../lib/common';
import SearchInput from '../SearchInput';
import Button from '../../common/Button';

const styles = require('./Header.scss');
const ChatIcon = require('react-icons/lib/fa/commenting-o');
const LogoutIcon = require('react-icons/lib/fa/sign-out');
const TagIcon = require('react-icons/lib/fa/tags');
const cx = classNames.bind(styles);

type Props = { 
    displayName: string | any,
    thumbnail: string | any,
    size: number,
    onLogout(): void,
    onSidebar(): void
}

const Header: React.SFC<Props> = ({ displayName, thumbnail, onLogout, size, onSidebar }) => {
    return (
        <div className={cx('header')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('wrapper')}>
                    <Logo />
                    <SearchInput />
                    {
                        size <= 790 ? (
                            <div className={cx('button-group')}>
                                <Button theme='noline' onClick={onSidebar}>
                                    <FaBars/>
                                </Button>
                            </div>
                        )  : (
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
                                <Button theme='noline'>
                                    <ChatIcon className={cx('chat')}/>
                                </Button>
                                <Button theme='noline' onClick={onLogout}>
                                    <LogoutIcon />
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};
export default Header;