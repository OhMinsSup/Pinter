import * as React from 'react';
import * as classNames from 'classnames/bind';
import NoticeItem from '../NoticeItem';

const styles = require('./NoticeItemList.scss');
const cx = classNames.bind(styles);

type Props = {
  messages: any[];
}

const NoticeItemList: React.SFC<Props> = ({ messages }) => {
  const messageList = messages.map((m, i) => {
    return (
      <NoticeItem 
        key={i}
        message={m.message}
        thumbnail={m.thumbnail}
      />
    )
  })
  return (
    <div className={cx("notice-item-list")}>
      {messageList}
    </div>
  );
};


export default NoticeItemList;