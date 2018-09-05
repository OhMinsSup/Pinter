import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinMenuItem from '../PinMenuItem';

const styles  = require('./PinMenu.scss');
const cx = classNames.bind(styles);

type Props = {
    ownUsername: string | null,
    ownDisplayName: string | null,
    username: string,
    displayName: string,
    id: string,
    visible: boolean,
    onClick(): void,
    onClickUpdate(id: string): Promise<void>,
    onAskRemove(id: string): void
}

const PinMenu: React.SFC<Props> = ({ visible, onClick, ownUsername, ownDisplayName, username, displayName, onClickUpdate, id, onAskRemove }) => {
    if (!visible) return null;
    return (
        <div className={cx('pin-menu-wrapper')}>
            <div className={cx('pin-menu-positioner')}>
                <div className={cx('pin-menu')}>
                    <div className={cx('menu-items')}>
                        {
                            (ownDisplayName === displayName) && (ownUsername == username) ? (
                                <React.Fragment>
                                    <PinMenuItem onClick={() => onClickUpdate(id)}>
                                        수정
                                    </PinMenuItem>
                                    <PinMenuItem onClick={() => onAskRemove(id)}>
                                        삭제
                                    </PinMenuItem>
                                    <PinMenuItem>
                                        공유
                                    </PinMenuItem>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <PinMenuItem>
                                        공유
                                    </PinMenuItem>
                                </React.Fragment>
                            )
                        }
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