import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinMenuItem from '../PinMenuItem';

const styles  = require('./PinMenu.scss');
const cx = classNames.bind(styles);

type Props = {
    visible: boolean,
    onClick(): void
}

const PinMenu: React.SFC<Props> = ({ visible, onClick }) => {
    if (!visible) return null;
    return (
        <div className={cx('pin-menu-wrapper')}>
            <div className={cx('pin-menu-positioner')}>
                <div className={cx('pin-menu')}>
                    <div className={cx('menu-items')}>
                            <PinMenuItem>
                                태그달기
                            </PinMenuItem>
                            <PinMenuItem>
                                수정하기
                            </PinMenuItem>
                            <PinMenuItem>
                                삭제하기
                            </PinMenuItem>
                            <PinMenuItem>
                                공유하기
                            </PinMenuItem>
                        <div className={cx('separator')}/>
                        <PinMenuItem onClick={onClick}>
                            메뉴 닫기
                        </PinMenuItem>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PinMenu;
