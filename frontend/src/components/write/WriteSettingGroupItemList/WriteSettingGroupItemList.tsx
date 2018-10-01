import * as React from 'react';
import * as classNames from 'classnames/bind';
import WriteSettingGroupItem from '../WriteSettingGroupItem';

const styles = require('./WriteSettingGroupItemList.scss');
const cx = classNames.bind(styles);

const WriteSettingGroupItemList = () => {
  return (
    <div className={cx("write-setting-group-item-list")}>
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
      <WriteSettingGroupItem />
    </div>
  );
};


export default WriteSettingGroupItemList;