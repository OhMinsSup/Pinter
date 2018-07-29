import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinWrapper.scss');
const cx = classNames.bind(styles);

type Props = {
    header: React.ReactNode,
    content: React.ReactNode
}
const PinWrapper: React.SFC<Props> = ({ header, content }) => {
    return (
        <div className={cx('pin-wrapper')}>
            <div className={cx('wrapper')}>
                <div className={cx('wrapper1')}>
                    <header>{header}</header>
                    <main>{content}</main>
                </div>
            </div>
        </div>
    )
}

export default PinWrapper;