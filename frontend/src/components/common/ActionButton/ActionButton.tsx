import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ActionButton.scss');
const cx = classNames.bind(styles);

type Props = {
    icon: React.ReactNode,
    id: string
    theme: 'like' | 'comment' | 'save',
    onClick(): void
}

const ActionButton: React.SFC<Props> = ({ icon, id, theme, onClick }) => {
    return (
        <span className={cx('wrapper')}>
            <button className={cx('btn')}>
                <span className={cx('icon', theme)}>
                    {icon}
                </span>
            </button>
        </span>
    )
}

export default ActionButton;