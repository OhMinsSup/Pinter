import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinItem.scss');
const cx = classNames.bind(styles);

type Props = {
    icons: React.ReactNode,
    count: number,
    type: string,
}

const PinItem:React.SFC<Props> = ({ icons, count, type }) => {
    return (
        <div className={cx('group')}>
            <button className={cx('btn')}>
                <div className={cx('item', type)}>
                    <span>
                        {icons}
                    </span>
                </div>
                <span className={cx('item-count', type)}>{count}</span>
            </button>
        </div>
    )
}

export default PinItem;