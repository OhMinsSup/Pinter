import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./FakePinCard.scss');
const cx = classNames.bind(styles);

type GrayBoxProps = {
    min: number,
    max: number,
}

class GrayBox extends React.Component<GrayBoxProps> {
    public static defaultProps = {
        min: 1,
        max: 6,
    }
    public size: number = 1;

    constructor(props: GrayBoxProps) {
        super(props);
        const { max, min } = this.props;
        this.size = min + Math.random() * (max - min);
    }

    public render() {
        return <div className={cx('gray-box')} style={{ width: `${this.size}rem` }}/>;
    }
}

type GrayBoxsProps = {
    count: number,
    min?: number,
    max?: number,
}

const GrayBoxes: React.SFC<GrayBoxsProps> = ({ count, min, max }) => {
    const array = Array.from(Array(count).keys());
    return (
        <React.Fragment>
        {
            array.map(num => <GrayBox key={num} min={(min as number)} max={(max as number)}/>)
        }
        </React.Fragment>
    )
};

type Props = {
    oneColumn?: boolean,
}

const FakePinCard: React.SFC<Props> = ({ oneColumn }) => {
    return (
        <React.Fragment>
            <div className={cx('PinCard FakePinCard', { 'one-column': (oneColumn as boolean) })}>
            <div className={cx('thumbnail-wrapper')}>
                <img src="https://github.com/velopert/velog/blob/master/velog-frontend/src/static/images/post_placeholder.png?raw=true" alt="thumbnail" />
            </div>
            <div className={cx('card-content')}>
                {!oneColumn && <div className={cx('user-thumbnail-wrapper')} />}
                <div className={cx('content-head')}>
                <div className={cx('username')}>
                    <GrayBox min={6} max={8} />
                </div>
                <h3>
                    <GrayBoxes count={7} />
                </h3>
                <div className={cx('subinfo')}>
                    <GrayBox min={4} max={4} />
                    <GrayBox min={5} max={5} />
                </div>
                </div>
                <div className={cx('description')}>
                <GrayBoxes count={15} />
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}

export default FakePinCard;