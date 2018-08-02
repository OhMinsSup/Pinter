import * as React from 'react';
import * as classNames from 'classnames/bind';
import ListItem from '../ListItem';

const styles = require('./ListBox.scss');
const cx = classNames.bind(styles);

type Props = {
    title: string,
    user: any[],
}

const ListBox: React.SFC<Props> = ({ title, user }) => {    
    return (
        <div className={cx('list-box')}>
            <div className={cx('title')}>{title}</div>
            <div className={cx('box')}>
                <ul className={cx('list-wrapper')}>
                    <div className={cx('list-itme-wrapper')}>
                        {
                            user.map(u => {
                                const { user: { _id, displayName, thumbnail, username } } = u;
                                return (
                                    <ListItem
                                        key={_id}
                                        id={_id}
                                        username={username}
                                        displayName={displayName}
                                        thumbnail={thumbnail}
                                    />
                                )
                            })
                        }
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