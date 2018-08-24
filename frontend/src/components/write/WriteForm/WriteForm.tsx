import * as React from 'react';
import * as classNames from 'classnames/bind';
import AutoTextarea from 'react-textarea-autosize';
import Button from '../../common/Button';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./WriteForm.scss');
const cx = classNames.bind(styles);

type Props = {
    inputTags: React.ReactNode
}

const WriteForm: React.SFC<Props> = ({ inputTags }) => {
    return (
        <div className={cx('write-form')}>
            <div className={cx('form-header')}>
                <div>
                    <Button className={cx('cancel-btn')} theme='noline'>
                        <CancelIcon />
                    </Button>
                </div>
                <div className={cx('submit-btn')}>
                    <Button theme='submit'>작성하기</Button>
                </div>
            </div>
            <div className={cx('form-widget')}>
                <div className={cx('content-relation-url-wrapper')}>
                    <label className={cx('content-url-title')}>
                        <div className={cx('title')}>웹사이트</div>
                    </label>
                    <div className={cx('input-wrapper')}>
                        <span>
                            <AutoTextarea placeholder="이 핀에 연결된 URL을 작성해주세요" name="relation_url"/>
                        </span>
                    </div>
                </div>
                <div className={cx('content-description-wrapper')}>
                    <label className={cx('content-description-title')}>
                        <div className={cx('title')}>내용</div>
                    </label>
                    <div className={cx('input-wrapper')}>
                        <span>
                            <AutoTextarea placeholder="이 핀에 대해 자세히 알려 주세요" name="description"/>
                        </span>
                    </div>
                </div>
                <div className={cx('content-tags-wrapper')}>
                    <label className={cx('content-tags-title')}>
                        <div className={cx('title')}>태그</div>
                    </label>
                    {inputTags}
                </div>
                <div className={cx('content-image-wrapper')}>
                    <label className={cx('content-image-title')}>
                        <div className={cx('title')}>이미지 업로드</div>
                    </label>
                </div>             
            </div>
        </div>
    )
}

export default WriteForm;