import * as React from 'react';
import * as classNames from 'classnames/bind';
import CancelButton from '../../common/CancelButton';

const styles = require('./WriteTemplate.scss');
const cx = classNames.bind(styles);

interface Props {
    size: number,
    children: React.ReactNode,
    onClick(): void
}

const WriteTemplate: React.SFC<Props> = ({ children, onClick, size }) => {
    return (
        <div className={cx('write-template')}>
            {children}
            {
                size <= 768 ? null: (
                    <CancelButton onClick={onClick}/>
                )
            }
        </div>
    )
}

export default WriteTemplate;