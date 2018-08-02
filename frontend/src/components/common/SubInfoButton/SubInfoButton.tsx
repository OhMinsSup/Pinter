import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SubInfoButton.scss');
const cx = classNames.bind(styles);

type Props = {
    icon: React.ReactNode,
    id: string
    theme: 'like' | 'comment' | 'save',
    onClick(name: 'like' | 'comment' | 'save', id: string, theme: string): Promise<any>
}

const SubInfoButton: React.SFC<Props> = ({ icon, theme, onClick, id }) => {
    return (
        <span className={cx('wrapper')}>
            <button className={cx('btn')} onClick={() => onClick(theme, id, theme)}>
                <span className={cx('icon', theme)}>
                    {icon}
                </span>
            </button>
        </span>
    );
}

export default SubInfoButton;