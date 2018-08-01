import * as React from 'react';
import * as classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const styles = require('./PinSide.scss');
const cx = classNames.bind(styles);

type Props = {
    tags: string[]
}

const PinSide: React.SFC<Props> = ({ tags }) => {
    return (
        <div className={cx('pin-side')}>
        <section>
          <div className={cx('section-title')}>#태그</div>
            <ul>
                {
                    tags.map(t => 
                    <li key={t}>
                        <NavLink to="/">
                            {t}
                        </NavLink>
                    </li>)
                }
            </ul>
        </section>
      </div>
    )
}

export default PinSide;