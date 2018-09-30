import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const styles = require('./GroupPageInfo.scss');
const cx = classNames.bind(styles);

const GroupPageInfo = () => {
    return (
        <div className={cx('group-page-info')}>
            <div className={cx('group-page1')}>
                <div className={cx('page1')}>
                    <strong className={cx('group-title')}>WebDev</strong>
                    <div className={cx('group-cover')}>
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_180,h_180,c_thumb/v1534512378322/H1gM-pH4UQ.png"/>
                    </div>
                    <p className={cx("group-member")}>  
                        <span className={cx("member-count")}>#120명</span>   
                        <span className={cx("leader")}>#Veloss 리더</span>  
                    </p>
                    <div className={cx('group-sign')}>
                        <Button theme="flex">
                            가입하기
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('group-contents')}>
                <p className={cx('contents')}>
                    이 그룹은 개발에 관련된 그룹 입니다. 많은 가입 부탁드립니다.
                </p>
            </div>
        </div>
    )
}

export default GroupPageInfo;