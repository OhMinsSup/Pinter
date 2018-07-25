import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./FormPin.scss');
const cx = classNames.bind(styles);

type Props = { }

const FormPin: React.SFC<Props> = () => {
    return (
        <div className={cx('form-pin')}>
            <div className={cx('form-wrapper')}>
                <div className={cx('form-header')}>
                    <div className={cx('header-wrapper')}>
                        <h1 className={cx('title')}>핀 만들기</h1>
                    </div>
                    <div className={cx('cancel-wrapper')}>
                        <button className={cx('cancel-btn')}>
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
                                            <img className={cx('img')} src="https://i.pinimg.com/564x/f8/3b/7c/f83b7c29c1c9fe6f12f4c3d6eee28ad7.jpg"/>
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
                                    <input type="text" placeholder="이 핀에 연결된 URL을 작성해주세요"/>
                                </span>
                            </div>
                        </div>
                        <div className={cx('content-description-wrapper')}>
                            <label className={cx('content-description-title')}>
                                <div className={cx('title')}>설명</div>
                            </label>
                            <div className={cx('input-wrapper')}>
                                <span>
                                    <textarea placeholder="이 핀에 대해 자세히 알려 주세요"/>
                                </span>
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