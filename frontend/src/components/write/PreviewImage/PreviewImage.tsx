import * as React from 'react';
import * as classNames from 'classnames/bind';

const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./PreviewImage.scss');
const cx = classNames.bind(styles);

type Props = {
  urls?: string[];
  onClick(url: string): void;
};

const PreviewImage: React.SFC<Props> = ({ urls, onClick }) => {
  const imagesList = (urls as string[]).map((image, index) => {
    return (
      <div key={index} className={cx('composer-image')}>
        <div className={cx('composer-image-container')}>
          <img key={index} src={image} alt={image} />
        </div>
        <div
          className={cx('composer-image-remove')}
          onClick={() => onClick(image)}
        >
          <CancelIcon />
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      {(urls as string[]).length === 0 ? null : (
        <div className={cx('preview-image')}>
          <div className={cx('image-container')}>
            <div className={cx('image-wrapper')}>
              <div className={cx('composer-images')}>{imagesList}</div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PreviewImage;
