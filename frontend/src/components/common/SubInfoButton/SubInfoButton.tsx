import * as React from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';

const styles = require('./SubInfoButton.scss');
const cx = classNames.bind(styles);

type Props = {
    icon: React.ReactNode,
    theme: 'like' | 'comment' | 'save',
    to: string
}

const SubInfoButton: React.SFC<Props> = ({ icon, theme, to }) => {
    return (
        <span className={cx('wrapper')}>
            <button className={cx('btn')}>
                <span className={cx('icon', theme)}>
                    <Link to={to}>{icon}</Link>
                </span>
            </button>
        </span>
    );
}

export default SubInfoButton;