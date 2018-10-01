import * as React from 'react';
import * as classNames from 'classnames/bind';

const EditIcon = require('react-icons/lib/md/edit');
const styles = require('./WriteSettingGroupItem.scss');
const cx = classNames.bind(styles);

const Item: React.SFC<{ name: string }> = ({ name }) => {
    return (
      <React.Fragment>
        <div className={cx("text")}>{name}</div>
        <div className={cx("buttons")}>
          <div className={cx("button", "edit")}>
            <EditIcon />
          </div>
        </div>
      </React.Fragment>
    );
};


class WriteSettingGroupItem extends React.Component<{}> {
    public render() {
      return (
        <div className={cx('write-setting-group-item')}>
          <Item name="veloss" />
        </div>
      );
    }
  }
  
  export default WriteSettingGroupItem;