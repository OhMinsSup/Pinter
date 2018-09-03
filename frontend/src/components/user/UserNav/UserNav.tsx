import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserMenuItem from '../UserMenuItem';

const styles = require('./UserNav.scss');
const cx = classNames.bind(styles);

type Props = {
    url: string,
    displayName: string
}

const UserNav:React.SFC<Props> = ({ url, displayName }) => {
    return (
        <section className={cx('nav-menu-itmes')}>
            <UserMenuItem
                text="핀"
                active={url === `/@${displayName}/pin`}
                to={`/@${displayName}/pin`}
            />
            <UserMenuItem
                text="팔로우"
                active={url === `/@${displayName}/follower`}
                to={`/@${displayName}/follower`}
            />
            <UserMenuItem
                text="팔로잉"
                active={url === `/@${displayName}/following`}
                to={`/@${displayName}/following`}
            />
            <UserMenuItem
                text="보관함"
                active={url === `/@${displayName}/locker`}
                to={`/@${displayName}/locker`}
            />            
        </section>
    )
}

export default UserNav;