import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as moment from 'moment';
import Button from '../../common/Button';

const styles = require('./PinInfo.scss');
const cx = classNames.bind(styles);

type Props = {
    relation_url: string,
    description: string,
    createdAt: string
}

const PinInfo: React.SFC<Props> = ({ relation_url, description, createdAt }) => {
    return (
        <div className={cx('pin-info')}>
            <Button theme="default">{relation_url}</Button>
            <p className={cx('description')}>{description}</p>
            <span className={cx('date')}>{moment(createdAt).format('ll')}</span>
        </div>
    );
}

export default PinInfo;