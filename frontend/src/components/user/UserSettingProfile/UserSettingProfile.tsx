import * as React from 'react';
import * as classNames from 'classnames/bind';
import UserSettingInput from '../UserSettingInput';

const styles = require('./UserSettingProfile.scss');
const ThumbnailIcon = require('react-icons/lib/fa/camera');
const cx = classNames.bind(styles);

type Props = {
  thumbnail: string;
  displayName: string;
  onCancel(): void;
  onUploadClick(): void;
  onChange(e: any): void;
};

const UserSettingProfile: React.SFC<Props> = ({
  onCancel,
  thumbnail,
  displayName,
  onUploadClick,
  onChange,
}) => {
  return (
    <div className={cx('setting-profile-wrapper')}>
      <div className={cx('setting-profile')}>
        <div className={cx('edit-card-wrapper')}>
          <div className={cx('card-background')}>
            <img className={cx('thumbnail')} src={thumbnail} alt="thumbnail" />
            <div className={cx('menu-anchor')}>
              <span className={cx('circle')} onClick={onUploadClick}>
                <ThumbnailIcon />
              </span>
            </div>
          </div>
          <section className={cx('card-primary')}>
            <UserSettingInput
              label="이름"
              value={displayName}
              name="displayName"
              onChange={onChange}
            />
          </section>
          <div className={cx('card-action')}>
            <div className={cx('separator')} />
            <button
              className={cx('action-button', 'cancle')}
              onClick={onCancel}
            >
              취소
            </button>
            <button className={cx('action-button', 'save')}>저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingProfile;
