import * as React from 'react';
import * as classNames from 'classnames/bind';
import AutoTextarea from 'react-textarea-autosize';
import Button from '../../common/Button';

const UploadIcon = require('react-icons/lib/md/cloud-upload');
const styles = require('./GroupCreate.scss');
const cx = classNames.bind(styles);

class GroupCreate extends React.Component<{}> {
    public render() {
        return (
            <div className={cx('group-create')}>
                <div className={cx('cover-thumbnail-wrapper')} >
                    <UploadIcon />
                    <span className={cx('cover-thumbnail')}>
                        표지 사진 넣기
                    </span>
                </div>
                <AutoTextarea className={cx('title')} placeholder="제목"/>
                <div className={cx('contents-wrapper')}>
                    <AutoTextarea className={cx('contents')} placeholder="어떤 그룹인지 소개해주세요"/>
                </div>
                <div className={cx('submit-wrapper')}>
                    <Button theme="submit">그룹 만들기</Button>
                </div>
            </div>
        )
    }
}

export default GroupCreate;