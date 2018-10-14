import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./GroupTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    header: React.ReactNode,
    children: React.ReactNode,
}

const GroupTemplate: React.SFC<Props> = ({ children, header }) => {
    return (
        <div className={cx('group-template')}>
            <div>{header}</div>
            <main>
                <div className={cx('group-wrapper')}>
                    <div className={cx('wrapper')}>{children}</div>
                </div>
            </main>
        </div>
    )
}

export default GroupTemplate;