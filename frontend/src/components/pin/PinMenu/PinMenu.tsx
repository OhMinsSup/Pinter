import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PinMenuItem from '../PinMenuItem';

const styles  = require('./PinMenu.scss');
const cx = classNames.bind(styles);

type Props = {
    visible?: boolean
}

const PinMenu: React.SFC<Props> = ({ visible }) => {
    if (!visible) return null;
    return (
        <div className={cx('pin-menu-wrapper')}>
            <div className={cx('pin-menu-positioner')}>
                <div className={cx('pin-menu')}>
                    <div className={cx('menu-items')}>
                        <Link to='/'>
                            <PinMenuItem>
                                MyBlog
                            </PinMenuItem>
                        </Link>
                        <Link to="/">
                            <PinMenuItem>
                                글쓰기
                            </PinMenuItem>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

PinMenu.defaultProps = {
    visible: false
}

export default PinMenu;