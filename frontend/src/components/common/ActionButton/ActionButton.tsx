import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ActionButton.scss');
const cx = classNames.bind(styles);

type Props = {
    icon: React.ReactNode,
    id: string
    theme: 'like' | 'comment' | 'save',
    onClick(name: 'like' | 'comment' | 'save', id: string, theme: string): Promise<any>,
}

const ActionButton: React.SFC<Props> = ({ icon, id, theme, onClick }) => {
    return (
        <span className={cx('wrapper')}>
            <button className={cx('btn')} onClick={() => onClick(theme, id, theme)}>
                <span className={cx('icon', theme)}>
                    {icon}
                </span>
            </button>
        </span>
    )
}

export default ActionButton;