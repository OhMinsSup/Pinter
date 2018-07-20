import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinCard from '../PinCard';

const styles = require('./PinCardList.scss');
const cx = classNames.bind(styles);

const PinCardList = () => {
    return (
        <div className={cx('pin-card-list')}>
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />
            <PinCard />

        </div>
    );
}

export default PinCardList;