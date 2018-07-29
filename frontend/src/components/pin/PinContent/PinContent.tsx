import * as React from 'react';
import * as classNames from 'classnames/bind';

/*
import PinIconButton from '../PinIconButton';
const HeartIcon = require('react-icons/lib/fa/heart-o');
const CommentIcon = require('react-icons/lib/fa/comment-o');
const SaveIcon = require('react-icons/lib/fa/bookmark-o');
*/
const styles = require('./PinContent.scss');
const cx = classNames.bind(styles);

const PinContent = () => {
    return (
        <div className={cx('pin-content')}>
            <article className={cx('pin-content-wrapper')}>
                <div className={cx('content-wrapper')}>
                    <div className={cx('image-wrapper')}>
                        <div className={cx('image')}>
                            <img src="https://scontent-icn1-1.cdninstagram.com/vp/497c0ec7c7865bb46a88472de9c899ff/5BDA9C38/t51.2885-15/e35/35616535_215789532393765_5988592786234933248_n.jpg" alt="이미지" />
                        </div>
                    </div>
                </div>
                <div className={cx('right-content-wrapper')}>
                    <section className={'icon-group'}>
                        하하
                        {/*
                        <PinIconButton 
                            icon={<HeartIcon />}
                            type='like'
                        />
                        <PinIconButton 
                            icon={<CommentIcon />}
                            type='comment'
                        />
                        <PinIconButton 
                            icon={<SaveIcon />}
                            type='saves'
                        />
                        */}
                    </section>
                </div>
            </article>
        </div>
    );
}

export default PinContent;