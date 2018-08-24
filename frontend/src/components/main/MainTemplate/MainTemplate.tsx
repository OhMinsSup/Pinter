import * as React from 'react';
import * as classNames from 'classnames/bind';

const Plus = require('react-icons/lib/fa/plus');
const styles = require('./MainTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    path: string,
    header: React.ReactNode,
    children: React.ReactNode,
    onClick(): void
}

const MainTemplate: React.SFC<Props> = ({ header, children, path, onClick }) => {
    return (
        <div className={cx('main-template')}>
            <header>{header}</header>
            <main>{children}</main>
            {
                path === '/' ? (
                    <div className={cx('floating-button')}>
                        <button className={cx('add-button')} onClick={onClick}>
                            <Plus />
                        </button>
                    </div>
                ) : null
            }
        </div>
    );
}

export default MainTemplate;