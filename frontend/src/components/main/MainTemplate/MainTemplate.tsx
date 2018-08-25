import * as React from 'react';
import * as classNames from 'classnames/bind';

const Plus = require('react-icons/lib/fa/plus');
const styles = require('./MainTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    path: string,
    sidebar: boolean,
    header: React.ReactNode,
    children: React.ReactNode,
    onClick(): void
}

const MainTemplate: React.SFC<Props> = ({ header, children, path, onClick, sidebar }) => {
    return (
        <div className={cx('main-template')}>
            <header>{header}</header>
            <main>{children}</main>
            {
                path === '/' ? (
                    <React.Fragment>
                        {
                            sidebar ? null : (
                                <div className={cx('floating-button')}>
                                    <button className={cx('add-button')} onClick={onClick}>
                                        <Plus />
                                    </button>
                                </div>
                            )
                        }
                    </React.Fragment>
                ) : null
            }
        </div>
    );
}

export default MainTemplate;