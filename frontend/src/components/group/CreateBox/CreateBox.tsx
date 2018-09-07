import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./CreateBox.scss');
const PlusIcon = require('react-icons/lib/fa/plus-circle');
const cx = classNames.bind(styles);

const CreateBox = () => {
    return (
        <div className={cx('create-box')}>
            <div className={cx('box-wrapper')}>
                <div className={cx('wrapper')}>
                    <Link to='/groups/write' className={cx('create-wrapper')}>
                        <div className={cx('create')}>
                            <PlusIcon/>
                        </div>
                    </Link>
                    <div className={cx('title-wrapper')}>
                        <div className={cx('title')}>그룹 만들기</div>
                    </div>
                </div>
                <div className={cx('whit-mask')}/>
            </div>
        </div>
    )
}

export default CreateBox;