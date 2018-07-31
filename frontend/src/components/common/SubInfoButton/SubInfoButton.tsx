import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SubInfoButton.scss');
const cx = classNames.bind(styles);

type Props = {
    icon: React.ReactNode,
    theme: 'like' | 'comment' | 'save',
}

const SubInfoButton: React.SFC<Props> = ({ icon, theme }) => {
    return (
        <span className={cx('wrapper')}>
            <button className={cx('btn')}>
                <span className={cx('icon', theme)}>
                    {icon}
                </span>
            </button>
        </span>
    );
}

export default SubInfoButton;