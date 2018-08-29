import * as React from 'react';
import * as classNames from 'classnames/bind';

const PrevIcon = require('react-icons/lib/fa/angle-left');
const NextIcon = require('react-icons/lib/fa/angle-right');
const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./Gallery.scss');
const cx = classNames.bind(styles);

type Props = {
    urls: string[]
}

type State = {
    currentNumber: number
}

class Gallery extends React.Component<Props, State> {
    public state = {
        currentNumber: 0,
    }

    public onNext() {
        const { urls } = this.props;
        if (this.state.currentNumber === urls.length - 1) {
            return this.setState({
                currentNumber: 0
            })
        }

        this.setState({
            currentNumber: this.state.currentNumber += 1,
        })
    }

    public onPrev() {
        if (this.state.currentNumber === 0) {
            return this.setState({
                currentNumber: 0,
            })
        }

        this.setState({
            currentNumber: this.state.currentNumber -= 1,
        })
    }

    public render() {
        const { urls } = this.props;
        const { onNext, onPrev } = this;
        return (
            <div className={cx('gallery')}>
                <div className={cx('gallery-content')}>
                    <button className={cx('cancel-button')}>
                        <CancelIcon />
                    </button>
                    <div className={cx('gallery-media')}>
                    {
                       urls.map((url: string, index: number) => {
                           return (
                                <img className={cx('image')} key={index} src={url} alt={url}/>
                           )
                       }) 
                    }
                    </div>
                    <div className={cx('nav-prev')} onClick={onPrev}>
                        <span className={cx('handle-prev')}>
                            <PrevIcon/>
                        </span>
                    </div>
                    <div className={cx(('nav-next'))} onClick={onNext}>
                        <span className={cx('handle-next')}>
                            <NextIcon/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
};

export default Gallery;