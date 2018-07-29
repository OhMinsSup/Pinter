import * as React from 'react';
import * as classNames from 'classnames/bind';

const style = require('./PinIconButton.scss');
const cx = classNames.bind(style);

type Props = {
    icon: React.ReactNode,
    type?: 'saves' | 'comment' | 'like'
}

const PinIconButton: React.SFC<Props> = ({ icon, type }) => {
    return (
        <span className={cx('button-wrapper', type)}>
            <button className={cx('icon-button')}>
                <span className={cx('wrapper', type)}>
                    {icon}
                </span>
            </button>
        </span>
    );
}

export default PinIconButton;