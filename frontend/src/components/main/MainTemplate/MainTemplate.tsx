import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const Plus = require('react-icons/lib/fa/plus');
const styles = require('./MainTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
  path: string;
  sidebar: boolean;
  displayName: any;
  size: number;
  header: React.ReactNode;
  children: React.ReactNode;
};

const MainTemplate: React.SFC<Props> = ({
  header,
  children,
  path,
  sidebar,
  displayName,
  size,
}) => {
  return (
    <div className={cx('main-template')}>
      <header>{header}</header>
      <main>{children}</main>
      {path === `/@${displayName}` ? null : (
        <React.Fragment>
          {sidebar === true || size <= 796 ? null : (
            <div className={cx('floating-button')}>
              <Link className={cx('add-button')} to="/write">
                <Plus />
              </Link>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default MainTemplate;
