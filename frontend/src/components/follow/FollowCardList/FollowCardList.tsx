import * as React from 'react';
import * as classNames from 'classnames/bind';
import FollowCard from '../FollowCard/FollowCard';

const styles = require('./FollowCardList.scss');
const cx = classNames.bind(styles);

type Props = {
    users: any[]
}

const FollowCardList: React.SFC<Props> = ({ users }) => {
    const userList = users.map(
        (user, i) => {
            const { _id, displayName, thumbnail } = user;
            return (
                <FollowCard
                    key={i}
                    id={_id}
                    thumbnail={thumbnail}
                    displayName={displayName}
                />
            )
        }
    );
    return (
        <div className={cx('follow-card-list')}>
            {userList}
        </div>
    )
}

export default FollowCardList;