import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const LabelIcon = require('react-icons/lib/md/label');
const styles = require('./GroupPrimarySidebar.scss');
const cx = classNames.bind(styles);

const GroupPrimarySidebar = () => {
    return (
        <div className={cx('primary-sidebar')}>
            <div className={cx('header')}>
                <Link to="/group" className={cx('wrapper')}>
                    <LabelIcon />
                    <span>가입한 그룹</span>
                </Link>
            </div>
            <div className={cx('sign-groups')}>
                <div className={cx('cover')}>
                    <Link to="/group" className={cx('link')}>
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_120,h_120,c_thumb/v1538062632520/HJbEY_5FX.png"/>
                    </Link>
                </div>
                <div className={cx('title')}>
                    <Link to="/group" className={cx('link')}>그룹명</Link>
                    <span className={cx('contents')}>그룹 소개내용</span>
                </div>
            </div>
        </div>
    )
}

export default GroupPrimarySidebar;