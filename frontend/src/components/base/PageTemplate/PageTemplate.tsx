import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PageTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode
}

const PageTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('page-template')}>
            { children }
        </div>
    )
}

export default PageTemplate;