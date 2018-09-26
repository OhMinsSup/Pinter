import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SearchTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    header: React.ReactNode,
    search: React.ReactNode,
    children: React.ReactNode
}

const SearchTemplate: React.SFC<Props> = ({ header, search,children }) => {
    return (
        <div className={cx('search-template')}>
            <div className={cx('head')}>{header}</div>
            <div className={cx('search-content')}>{search}</div>
            <div className={cx('result')}>{children}</div>
        </div>
    );
};

export default SearchTemplate;