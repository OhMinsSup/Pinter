import * as React from 'react';
import * as classNames from 'classnames/bind';
import SettingInput from '../SettingInput';

const styles = require('./SettingProfile.scss');
const ThumbnailIcon = require('react-icons/lib/fa/camera');
const cx = classNames.bind(styles);

type Props = {
    thumbnail: string | any,
    displayName: string | any,
    onCancel(): void
}

const SettingProfile: React.SFC<Props> = ({ onCancel, thumbnail, displayName }) => {
    const defaultThumbnail = "https://benefitlombard.eu/images/no-image.jpg";
    return (
        <div className={cx('setting-profile-wrapper')}>
            <div className={cx('setting-profile')}>
            <div className={cx('edit-card-wrapper')}>
                <div className={cx('card-background')}>
                    <img className={cx('thumbnail')} src={thumbnail ? thumbnail : defaultThumbnail} alt="thumbnail" />
                    <div className={cx('menu-anchor')}>
                    <span className={cx('circle')} >
                        <ThumbnailIcon />
                    </span>
                    </div>
                </div>
                <section className={cx('card-primary')}>
                    <SettingInput label="이름" value={displayName} name="displayName"/>
                </section>
                <div className={cx('card-action')}>
                    <div className={cx('separator')} />
                        <button className={cx('action-button', 'cancle')} onClick={onCancel}>
                            취소
                        </button>
                    <button className={cx('action-button', 'save')} >저장</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SettingProfile;