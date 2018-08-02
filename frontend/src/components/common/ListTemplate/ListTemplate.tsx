import * as React from 'react';
import * as classNames from 'classnames/bind';
import { MdClose } from 'react-icons/lib/md';

const styles = require('./ListTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
    onBoxClick(): any
}

const ListTemplate: React.SFC<Props> = ({children, onBoxClick}) => {
    return (
        <div className={cx('list-template')}>
            <button className={cx('cancel-btn')} onClick={onBoxClick}>
                <MdClose/>
            </button>
            <div className={cx('wrapper')}>
                {children}
            </div>
        </div>
    )
}

export default ListTemplate;