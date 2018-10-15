import * as React from 'react';
import * as classNames from 'classnames/bind';
import { createArray } from '../../../lib/common';
import FakePinCard from '../FakePinCard';

const styles = require('./FakePinCards.scss');
const cx = classNames.bind(styles);

type Props = {
  pins: any[];
  theme?: string;
};

const FakePinCards: React.SFC<Props> = ({ pins, theme }) => {
  return (
    <div className={cx('fake-pins', theme)}>
      {createArray(pins.length === 0 ? 10 : pins.length).map(num => (
        <FakePinCard key={num} />
      ))}
    </div>
  );
};

export default FakePinCards;
