import * as React from 'react';
import * as classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const styles = require('./PinSide.scss');
const cx = classNames.bind(styles);

const PinSide = () => {
    return (
        <div className={cx('pin-side')}>
        <section>
          <div className={cx('section-title')}>#태그</div>
          <ul>
                <li>
                    <NavLink to="/">
                    태그
                    <span className={cx('count')}>5</span>
                  </NavLink>
                </li>
            </ul>
        </section>
      </div>
    )
}

export default PinSide;