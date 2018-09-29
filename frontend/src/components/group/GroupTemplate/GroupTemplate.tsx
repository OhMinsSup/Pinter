import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./GroupTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
    sidebar: React.ReactNode,
    head: React.ReactNode,
    primarySidebar: React.ReactNode,
}

const GroupTemplate: React.SFC<Props> = ({ children, sidebar, primarySidebar, head }) => {
    return (
        <div className={cx('group-template')}>
            <div className={cx('group-sidebar')}>
                <div className={cx('sidebar-content')}>
                    {sidebar}
                </div>
            </div>
            <div className={cx('shadow-sidebar')}/>
            <div className={cx('feed-area')}>
                <header className={cx('group-head')}>
                    {head}
                </header>
                <main>{children}</main>
            </div>
            <aside className={cx('primary-sidebar')}>
                {primarySidebar}
            </aside>
        </div>
    )
}

export default GroupTemplate;