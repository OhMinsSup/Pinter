import * as React from 'react';
import * as classNames from 'classnames/bind';
import ListItem from '../ListItem';

const styles = require('./ListBox.scss');
const cx = classNames.bind(styles);

type Props = {
    title?: string
}

const ListBox: React.SFC<Props> = ({ title }) => {
    return (
        <div className={cx('list-box')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('box')}>
                <ul className={cx('list-wrapper')}>
                    <div className={cx('list-itme-wrapper')}>
                        <ListItem />
                    </div>
                </ul>
            </div>
        </div>
    )
}

ListBox.defaultProps = {
    title: '팔로잉'
}

export default ListBox;