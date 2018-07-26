import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const RightIcon = require('react-icons/lib/fa/arrow-circle-right');
const LeftIcon = require('react-icons/lib/fa/arrow-circle-left');
const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./FormPin.scss');
const cx = classNames.bind(styles);

type Props = { 
    description: string,
    relation_url: string,
    thumbnail?: string,
    inputTags: React.ReactNode,
    dropImage: React.ReactNode
    onChangInput(e: any): void,
    onClose(): void
}

const FormPin: React.SFC<Props> = ({ inputTags, dropImage, onChangInput, description, relation_url, thumbnail, onClose }) => {
    const defaultThumbnail = 'https://benefitlombard.eu/images/no-image.jpg';
    return (
        <div className={cx('form-pin')}>
            <div className={cx('form-wrapper')}>
                <div className={cx('form-header')}>
                    <div className={cx('header-wrapper')}>
                        <h1 className={cx('title')}>핀 만들기</h1>
                    </div>
                    <div className={cx('cancel-wrapper')}>
                        <button className={cx('cancel-btn')} onClick={onClose}>
                            <CancelIcon />
                        </button>
                    </div>
                    <hr />
                </div>
                <div className={cx('form-content')}>
                    <div className={cx('image-content')}>
                        <div className={cx('content-image-wrapper')}>
                            <div className={cx('image-wapper')}>
                                <div className={cx('image')}>
                                    <div className={cx('wrapper')}>
                                        <div className={cx('wrapper1')}>
                                            <img className={cx('img')} src={thumbnail ? thumbnail : defaultThumbnail}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('write-content')}>
                        <div className={cx('content-relation-url-wrapper')}>
                            <label className={cx('content-url-title')}>
                                <div className={cx('title')}>웹사이트</div>
                            </label>
                            <div className={cx('input-wrapper')}>
                                <span>
                                    <input type="text" placeholder="이 핀에 연결된 URL을 작성해주세요" name="relation_url" value={relation_url} onChange={onChangInput}/>
                                </span>
                            </div>
                        </div>
                        <div className={cx('content-description-wrapper')}>
                            <label className={cx('content-description-title')}>
                                <div className={cx('title')}>설명</div>
                            </label>
                            <div className={cx('input-wrapper')}>
                                <span>
                                    <textarea placeholder="이 핀에 대해 자세히 알려 주세요" name="description" value={description} onChange={onChangInput}/>
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
                            {dropImage}
                            <div className={cx('next-image')}>
                                <button className={cx('previous')}>
                                    <LeftIcon />
                                 </button>
                                <button className={cx('next')}>
                                    <RightIcon/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('form-footer')}>
                    <hr />
                    <div className={cx('footer-wrapper')}>
                        <Button className={cx('submit-btn')} theme="default">
                            완료
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormPin;