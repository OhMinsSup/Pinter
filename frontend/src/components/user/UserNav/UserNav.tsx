import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserNavItem from '../UserNavItem';

const styles = require('./UserNav.scss');
const cx = classNames.bind(styles);

type Props = {
    url: string,
    displayName: string
}

const UserNav:React.SFC<Props> = ({ url, displayName }) => {
    return (
        <section className={cx('nav-menu-itmes')}>
            <UserNavItem
                text="핀"
                active={url === `/@${displayName}/pin`}
                to={`/@${displayName}/pin`}
            />
            <UserNavItem
                text="보관함"
                active={url === `/@${displayName}/locker`}
                to={`/@${displayName}/locker`}
            />            
        </section>
    )
}

export default UserNav;