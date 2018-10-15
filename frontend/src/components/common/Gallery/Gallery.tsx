import * as React from 'react';
import * as classNames from 'classnames/bind';

const PrevIcon = require('react-icons/lib/fa/angle-left');
const NextIcon = require('react-icons/lib/fa/angle-right');
const CancelIcon = require('react-icons/lib/md/close');
const styles = require('./Gallery.scss');
const cx = classNames.bind(styles);

type Props = {
  urls: string[];
  onClose(): void;
};

type State = {
  currentNumber: number;
};

class Gallery extends React.Component<Props, State> {
  public state = {
    currentNumber: 0,
  };

  public onNext = () => {
    if (this.state.currentNumber === this.props.urls.length - 1) {
      return this.setState({
        currentNumber: 0,
      });
    }

    this.setState({
      currentNumber: (this.state.currentNumber += 1),
    });
  };

  public onPrev = () => {
    if (this.state.currentNumber <= 0) {
      return this.setState({
        currentNumber: this.props.urls.length - 1,
      });
    }

    this.setState({
      currentNumber: (this.state.currentNumber -= 1),
    });
  };

  public render() {
    const { urls, onClose } = this.props;
    const { onNext, onPrev } = this;

    return (
      <div className={cx('gallery')}>
        <div className={cx('gallery-content')}>
          <button className={cx('cancel-button')} onClick={onClose}>
            <CancelIcon />
          </button>

          <div className={cx('gallery-media')}>
            {urls.map((url: string, index: number) => {
              return this.state.currentNumber === index ? (
                <img
                  className={cx('image')}
                  key={index}
                  src={urls[index]}
                  alt={url}
                />
              ) : (
                <img
                  className={cx('image')}
                  key={index}
                  src={url}
                  alt={url}
                  style={{ display: 'none' }}
                />
              );
            })}
          </div>
          <div className={cx('nav-prev')} onClick={onPrev}>
            <span className={cx('handle-prev')}>
              <PrevIcon />
            </span>
          </div>
          <div className={cx('nav-next')} onClick={onNext}>
            <span className={cx('handle-next')}>
              <NextIcon />
            </span>
          </div>
          <div className={cx('location-wrapper')}>
            {urls.map((url: string, index: number) => {
              return this.state.currentNumber === index ? (
                <div
                  key={index}
                  className={cx('location')}
                  style={{ backgroundColor: '#3897f0' }}
                />
              ) : (
                <div
                  key={index}
                  className={cx('location')}
                  style={{ backgroundColor: '#dbdbdb' }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
