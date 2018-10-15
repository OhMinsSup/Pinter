import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./FakePinCard.scss');
const cx = classNames.bind(styles);

type GrayBoxProps = {
  min: number;
  max: number;
};

class GrayBox extends React.Component<GrayBoxProps> {
  public static defaultProps = {
    min: 1,
    max: 6,
  };
  public size: number = 1;

  constructor(props: GrayBoxProps) {
    super(props);
    const { max, min } = this.props;
    this.size = min + Math.random() * (max - min);
  }

  public render() {
    return (
      <div className={cx('gray-box')} style={{ width: `${this.size}rem` }} />
    );
  }
}

type GrayBoxsProps = {
  count: number;
  min?: number;
  max?: number;
};

const GrayBoxes: React.SFC<GrayBoxsProps> = ({ count, min, max }) => {
  const array = Array.from(Array(count).keys());
  return (
    <React.Fragment>
      {array.map(num => (
        <GrayBox key={num} min={min as number} max={max as number} />
      ))}
    </React.Fragment>
  );
};

type Props = {
  flex?: string;
};

const FakePinCard: React.SFC<Props> = ({ flex }) => {
  return (
    <div className={cx('fake-pin', flex)}>
      <div className={cx('thumbnail-wrapper')}>
        <div className={cx('thumbnail')} />
      </div>
      <div className={cx('card-content')}>
        <div className={cx('content-head')}>
          <div className={cx('displayName')}>
            <GrayBox min={6} max={8} />
          </div>
          <div className={cx('subinfo')}>
            <GrayBox min={4} max={4} />
            <GrayBox min={5} max={5} />
          </div>
        </div>
        <div className={cx('description')}>
          <GrayBoxes count={7} />
        </div>
      </div>
    </div>
  );
};
export default FakePinCard;
