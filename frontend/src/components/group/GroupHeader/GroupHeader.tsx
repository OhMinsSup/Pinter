import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const LogoIcon = require('react-icons/lib/fa/pinterest');
const styles = require('./GroupHeader.scss');
const cx = classNames.bind(styles);

type Props = {
    displayName: any,
    thumbnail: any,
    size: number,
    menu: React.ReactNode,
}

const GroupHeader: React.SFC<Props> = ({ displayName, thumbnail, menu, size }) => {
    return (
        <React.Fragment>
        {
            size <= 875 ? (
                <div className={cx('group-header')}>
                    <div className={cx('left-items')}>
                        <div className={cx('btn-group')}>
                            <Link to='/group/create' className={cx('create')}>그룹 만들기</Link>
                        </div>
                    </div>
                    <div className={cx('mobile-head')}>
                        <Link to="/" className={cx('title')}>
                            <LogoIcon />
                            <span>Pinter</span>
                        </Link>
                    </div>
                    <div className={cx('right-items')}>
                        <Button className={cx('users')} theme='noline'>
                            <img className={cx('thumbnail')} src={thumbnail} alt={displayName}/>
                            <span className={cx('username')}>{displayName}</span>
                        </Button>
                        {menu}
                    </div>
                </div>
            ) : (
                <div className={cx('group-header')}>
                    <div className={cx('left-items')}>
                        <div className={cx('btn-group')}>
                            <Link to='/group/create' className={cx('create')}>그룹 만들기</Link>
                        </div>
                    </div>
                    <div className={cx('right-items')}>
                        <Button className={cx('users')} theme='noline'>
                            <img className={cx('thumbnail')} src={thumbnail} alt={displayName}/>
                            <span className={cx('username')}>{displayName}</span>
                        </Button>
                        {menu}
                    </div>
                </div>
            )
        }  
        </React.Fragment>
    )
}

export default GroupHeader;
