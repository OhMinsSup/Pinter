import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./MenuItem.scss');
const cx = classNames.bind(styles);

type Props = { 
    icon: React.ReactNode,
    username?: string | null
}

const MenuItem: React.SFC<Props> = ({ icon, username }) => {
    console.log(username);
    
    return (
        <div className={cx('menuItem-wrapper')}>
            <Link to="/" className={cx('wrapper')}>
                <div className={cx('item-wrapper')}>
                    <div className={cx('item')}>
                        <div className={cx('text-wrapper')}>
                            {
                                username ? (
                                    <div className={cx('text')}>{icon} {username}</div>
                                ) : (
                                    <div className={cx('text')}>{icon}</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    );
}

export default MenuItem;