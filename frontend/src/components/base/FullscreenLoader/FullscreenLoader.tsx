import * as React from 'react';
import Spinner from '../../common/Spinner';
import * as classNames from 'classnames/bind';

const styles = require('./FullscreenLoader.scss');
const cx = classNames.bind(styles);

type Props = {
  visible: boolean
};

const FullscreenLoader: React.SFC<Props> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className={cx("FullscreenLoader")}>
      <Spinner />
    </div>
  );
};

export default FullscreenLoader;