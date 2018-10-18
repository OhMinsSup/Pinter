import * as React from 'react';
import * as classNames from 'classnames/bind';
import Textarea from 'react-textarea-autosize';
import ModalWrapper from 'src/components/common/ModalWrapper';
import Button from 'src/components/common/Button';

const styles = require('./MakeGroupModal.scss');
const cx = classNames.bind(styles);

type Props = {
  onOpen: boolean;
  groupId: string;
  onClick(): void;
  onSubmit(value: string, active: boolean): Promise<void>;
};

type State = {
  visible: boolean;
  value: string;
};

class MakeGroupModal extends React.Component<Props, State> {
  public state = {
    visible: false,
    value: '',
  };

  public onChange = (e: any) => {
    const { value } = e.target;

    this.setState({
      value: value,
    });
  };

  public onAction = () => {
    const { visible } = this.state;

    this.setState({
      visible: visible ? false : true,
    });
  };

  public render() {
    const { onClick, onOpen, onSubmit, groupId } = this.props;
    const { visible, value } = this.state;
    const { onAction, onChange } = this;
    return (
      <ModalWrapper open={onOpen}>
        <div className={cx('make-group-modal')}>
          <div className={cx('group-form')}>
            <div className={cx('form-header')}>
              <h5 className={cx('header')}>
                {groupId ? '그룹 수정하기' : '그룹 만들기'}
              </h5>
            </div>
            <hr />
            <div className={cx('form-content')}>
              <div className={cx('title-content')}>
                <div className={cx('label-wrapper')}>
                  <label>
                    <div className={cx('title')}>제목</div>
                  </label>
                </div>
                <div className={cx('text-wrapper')}>
                  <span>
                    <Textarea
                      className={cx('title')}
                      placeholder="예: oo여행 사진, 나만의 맛집"
                      onChange={onChange}
                    />
                  </span>
                </div>
              </div>
              <div className={cx('private-content')}>
                <div className={cx('label-wrapper')}>
                  <label>
                    <div className={cx('title')}>비밀 설정</div>
                  </label>
                </div>
                <div className={cx('private-wrapper')}>
                  <div className={cx('wrapper')}>
                    <div className={cx('private')}>
                      <input
                        className={cx('check-input')}
                        type="checkbox"
                        onClick={onAction}
                      />
                      {visible ? (
                        <div className={cx('check-activation')} />
                      ) : (
                        <div className={cx('check-disabled')} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={cx('form-footer')}>
              <div className={cx('btn-wrapper')}>
                <Button theme="default" className={cx('btn')} onClick={onClick}>
                  취소
                </Button>
                <Button
                  theme="default"
                  className={cx('btn')}
                  onClick={() => onSubmit(value, visible)}
                >
                  {groupId ? '수정하기' : '만들기'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>
    );
  }
}

export default MakeGroupModal;
