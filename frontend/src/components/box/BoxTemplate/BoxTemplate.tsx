import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdClose } from 'react-icons/lib/md';

const styles = require('./BoxTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
    onAction(): void
}

const BoxTemplate: React.SFC<Props> = ({children, onAction}) => {
    return (
        <div className={cx('box-template')}>
            <button className={cx('cancel-btn')} onClick={onAction}>
                <MdClose/>
            </button>
            <div className={cx('wrapper')}>
                {children}
            </div>
        </div>
    )
}

export default BoxTemplate;