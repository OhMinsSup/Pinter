import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SearchTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    header: React.ReactNode,
    children: React.ReactNode
}

const SearchTemplate: React.SFC<Props> = ({ header, children }) => {
    return (
        <div className={cx('search-template')}>
            <div className={cx('head')}>{header}</div>
            <main className={cx('search-content')}>{children}</main>
        </div>
    );
};

export default SearchTemplate;