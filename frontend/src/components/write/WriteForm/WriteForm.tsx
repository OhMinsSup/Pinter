import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from '../../common/Button';
import WriteItem from '../WriteItem';
import PreviewImage from '../PreviewImage';

const styles = require('./WriteForm.scss');
const cx = classNames.bind(styles);

type Props = {
  id: string;
  inputTags: React.ReactNode;
  dropImage: React.ReactNode;
  body: string;
  urls: string[];
  relationUrl: string;
  onChange(e: any): void;
  onRemoveUrl(url: string): void;
  onSubmit(): void;
};

const WriteForm: React.SFC<Props> = ({
  onSubmit,
  inputTags,
  dropImage,
  onChange,
  relationUrl,
  body,
  urls,
  onRemoveUrl,
  id,
}) => {
  return (
    <div className={cx('write-form')}>
      <div className={cx('form-header')}>
        {id ? (
          <div className={cx('submit-btn')}>
            <Button theme="outline" onClick={onSubmit}>
              수정하기
            </Button>
          </div>
        ) : (
          <div className={cx('submit-btn')}>
            <Button theme="outline" onClick={onSubmit}>
              작성하기
            </Button>
          </div>
        )}
      </div>
      <div className={cx('form-widget')}>
        <WriteItem
          title="웹사이트"
          placeholder="이 핀에 연결된 URL을 작성해주세요"
          name="relation_url"
          type="input"
          value={relationUrl}
          onChange={onChange}
        />
        <WriteItem
          title="내용"
          placeholder="이 핀에 대해 자세히 알려 주세요"
          name="body"
          type="input"
          value={body}
          onChange={onChange}
        />
        <PreviewImage urls={urls} onClick={onRemoveUrl} />
        <WriteItem title="태그" element={inputTags} />
        <WriteItem title="이미지 업로드" element={dropImage} />
      </div>
    </div>
  );
};

export default WriteForm;
