import * as React from 'react';
import * as classNames from 'classnames/bind';
import Logo from '../Logo';
import SearchInput from '../SearchInput';
import Button from '../../common/Button';

const styles = require('./Header.scss');
const ChatIcon = require('react-icons/lib/fa/commenting-o');
const TagIcon = require('react-icons/lib/fa/tags');
const HomeIcon = require('react-icons/lib/fa/home');
const cx = classNames.bind(styles);

type Props = { 
    username: string | any,
    thumbnail: string | any
}

const Header: React.SFC<Props> = ({ username, thumbnail }) => {
  return (
        <div className={cx('header')}>
            <div className={cx('header-wrapper')}>
                <div className={cx('wrapper')}>
                    <Logo />
                    <SearchInput />
                    <div className={cx('button-group')}>
                        <Button theme='noline' to='/'>
                            <HomeIcon className={cx('home')}/>
                        </Button>
                        <Button theme='noline'>
                            <TagIcon className={cx('tag')}/>
                        </Button>
                        <Button theme='noline' to={`/@${username}`}>
                            <img className={cx('thumbnail')} src={thumbnail} alt={username}/>
                            <span className={cx('username')}>{username}</span>
                        </Button>
                        <Button theme='noline'>
                            <ChatIcon className={cx('chat')}/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Header;