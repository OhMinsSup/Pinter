import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./TagTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode;
};

const TagTemplate: React.SFC<Props> = ({ children }) => (
  <div className={cx('tag-template')}>{children}</div>
);

export default TagTemplate;
