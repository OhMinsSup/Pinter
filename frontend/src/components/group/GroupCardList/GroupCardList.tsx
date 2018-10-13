import * as React from 'react';
import * as classNames from 'classnames/bind';
import GroupCard from '../GroupCard/GroupCard';

const styles = require('./GroupCardList.scss');
const cx = classNames.bind(styles);

type Props = {
    commonDisplayName: string, 
    commonUserName: string, 
    ownDisplayName: any,
    ownUsername: any,
    active: boolean,
    groups: any[],
    onSelectTab(visible: boolean): void
}

const GroupCardList: React.SFC<Props> = ({ 
    groups, 
    active, 
    onSelectTab,
    commonDisplayName, 
    commonUserName, 
    ownDisplayName,
    ownUsername,
}) => {
    const groupList = groups.map(group => {
        const {
            groupId,
            title,
            user: {
                displayName,
                thumbnail,
            },
        } = group;

        return (
            <GroupCard
                key={groupId}
                groupId={groupId}
                title={title}
                displayName={displayName}
                thumbnail={thumbnail}
            />
        )
    });

    return (
        <React.Fragment>
            {
                (ownDisplayName === commonDisplayName) && (ownUsername === commonUserName) ? (
                    <div className={cx('section-wrapper')}>
                        <ul className={cx('section-tab')}>
                            <li className={cx('item', { active: active === false  })} onClick={() => onSelectTab(false)}>공개</li>
                            <li className={cx('item', { active: active === true })} onClick={() => onSelectTab(true)}>비공개</li>
                        </ul>
                    </div>
                ) : null
            }
            <div className={cx('group-card-list')}> 
                {groupList}
            </div>
        </React.Fragment>
    )
}

export default GroupCardList;