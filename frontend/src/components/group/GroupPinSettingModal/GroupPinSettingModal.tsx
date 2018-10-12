import * as React from 'react';
import * as classNames from 'classnames/bind';
import ModalWrapper from 'src/components/common/ModalWrapper';
import Button from 'src/components/common/Button';

const ImageIcon = require('react-icons/lib/io/image');
const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./GroupPinSettingModal.scss');
const cx = classNames.bind(styles);

type Props = {
    onOpen: boolean,
    body: string,
    url: string,
    tags: string[],
    groups: any[],
    onCancel(): void,
}

const GroupItem: React.SFC<{
    title: string,
    groupId: string,
}> = ({ title }) => {
    return (
        <div className={cx('item-wrapper')}>
            <div className={cx('text')}>
                <span>{title}</span>
                <Button theme="default">저장</Button>
            </div>
        </div>
    )
}

const GroupPinSettingModal: React.SFC<Props> = ({ 
    onOpen, 
    onCancel, 
    url, 
    body, 
    tags, 
    groups,
}) => {
    const tagList = tags.map((tag: string) => {
        return (
            <li key={tag}>
                {tag}
            </li>
        )
    });
    
    const groupList = groups.map(group => {
        const { title, groupId } = group;

        return(
            <GroupItem 
                key={groupId}
                title={title}
                groupId={groupId}
            />
        )
    })

    return (
        <ModalWrapper open={onOpen}>
            <div className={cx('group-pin-setting-modal')}>
                <div className={cx('wrapper')}>
                    <div className={cx('form-header')}>
                        <div className={cx('header-wrapper')}>
                            <h1>그룹 선택</h1>
                        </div>
                        <div className={cx('cancel-btn-wrapper')}>
                            <button className={cx('cancel-btn')} onClick={onCancel}>
                                <div className={cx('cancel')}>
                                    <CancelIcon />
                                </div>
                            </button>
                        </div>
                        <hr />
                    </div>
                    <div className={cx('form-content')}>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('wrapper')}>
                                <div className={cx('pin-data')}>
                                    <div className={cx('pin-wrapper')}>
                                        <div className={cx('pin')}>
                                            <div className={cx('pin1')}>
                                                <div className={cx('wrapper')}>
                                                    {
                                                        url ? <img src={url} alt="thumbnail"/> : <ImageIcon/>
                                                    }
                                                </div>
                                                <span>{body}</span>
                                                <ul>{tagList}</ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('group-list')}>
                                    <div className={cx('group-wrapper')}>
                                        <div className={cx('wrapper')}>
                                            <div className={cx('groups')}>
                                                <div className={cx('title-wrapper')}>그룹 리스트</div>
                                                {groupList}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    )
}


export default GroupPinSettingModal;