import * as React from 'react';
import * as classNames from 'classnames/bind';
import SubInfoButton from '../SubInfoButton';

const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');
const styles = require('./PinSubInfo.scss');
const cx = classNames.bind(styles);

const PinSubInfo = () => {
    return (
        <div className={cx('subinfo')}>
            <section className={cx('info')}>
                <span>댓글 8개</span>
                <span>좋아요 48개</span>     
            </section>
            <section className={cx('subinfo-wrapper')}>
                <SubInfoButton 
                    icon={<HeartIcon/>}
                    theme="like"
                    to="/"
                />
                <SubInfoButton 
                    icon={<CommentIcon/>}
                    theme="comment"
                    to="/"                
                />
                <SubInfoButton 
                    icon={<SaveIcon/>}
                    theme="save"
                    to="/"                
                />
                <span className={cx('date')}>Jul 16. 2018</span>       
            </section>
        </div>
    );
}

export default PinSubInfo;