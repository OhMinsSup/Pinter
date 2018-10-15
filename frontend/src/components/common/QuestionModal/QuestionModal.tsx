import * as React from 'react';
import * as classNames from 'classnames/bind';
import ModalWrapper from '../ModalWrapper';
import Button from '../Button';

const styles = require('./QuestionModal.scss');
const cx = classNames.bind(styles);

type Props = {
  title?: string;
  description: string;
  confirmText?: string;
  onConfirm: () => any;
  onCancel: () => any;
  open: boolean;
};

const QuestionModal: React.SFC<Props> = ({
  title,
  description,
  confirmText,
  onConfirm,
  onCancel,
  open,
}) => (
  <ModalWrapper open={open}>
    <div className={cx('QuestionModal')}>
      <div className={cx('modal-content')}>
        {title && <h4>{title}</h4>}
        <p>{description}</p>
        <div className={cx('button-area')}>
          <Button theme="outline" onClick={onCancel} className={cx('button')}>
            취소
          </Button>
          <Button theme="outline" onClick={onConfirm} className={cx('button')}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  </ModalWrapper>
);

QuestionModal.defaultProps = {
  confirmText: '확인',
};

export default QuestionModal;
