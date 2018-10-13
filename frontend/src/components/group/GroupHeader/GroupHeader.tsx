import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./GroupHeader.scss');
const cx = classNames.bind(styles);

type Props = { }

const GroupHeader: React.SFC<Props> = ({  }) => {
    return (
        <div className={cx('group-header')}> 
            헤더
        </div>
    )
}

export default GroupHeader;