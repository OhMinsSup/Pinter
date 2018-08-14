import * as React from 'react';
import FollowCard from '../FollowCard/FollowCard';
import FollowTemplate from '../FollowTemplate';

type Props = {
    users: any[],
}

const FollowCardList: React.SFC<Props> = ({ users }) => {
    const usersList = users.map(
        (user) => {
            const { following, follower } = user;
            if (following && !follower) {
                const { _id, username, displayName, thumbnail } = following;
                return (
                    <FollowCard 
                        key={_id}
                        id={_id}
                        username={username}
                        displayName={displayName}
                        thumbnail={thumbnail}
                    />
                )
            } else {
                const { _id, username, displayName, thumbnail } = follower;

                return (
                    <FollowCard 
                        key={_id}
                        id={_id}
                        username={username}
                        displayName={displayName}
                        thumbnail={thumbnail}
                    />
                )
            }
        }
    )
    return (
        <FollowTemplate>
            {usersList}
        </FollowTemplate>
    );
}

export default FollowCardList;