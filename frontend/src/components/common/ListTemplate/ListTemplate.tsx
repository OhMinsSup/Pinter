import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ListTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const ListTemplate: React.SFC<Props> = ({children}) => {
    return (
        <div className={cx('list-template')}>
            <div className={cx('wrapper')}>{children}</div>
        </div>
    )
}

export default ListTemplate;