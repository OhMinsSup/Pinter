import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./ModalWrapper.scss');
const cx = classNames.bind(styles);

type Props = {
  children: React.ReactNode,
  className?: string,
  open: boolean,
};

type State = {
  animate: boolean,
};

class ModalWrapper extends React.Component<Props, State> {
  public animateId: any = null;

  public state = {
    animate: false,
  };

  public animate(): void {
    this.setState({ animate: true });
    this.animateId = setTimeout(() => {
      this.setState({
        animate: false,
      });
    }, 150);
  }

   public componentDidUpdate(prevProps: Props) {
    if (prevProps.open !== this.props.open) {
      this.animate();
    }
  }

  public omponentWillUnmount() {
    clearTimeout(this.animateId);
  }

  public render() {
    const { children, className, open } = this.props;
    const { animate } = this.state;

    if (!open && !animate) return null;

    return (
      <div className={cx('ModalWrapper')}>
        <div className={cx('dimmer')} />
        <div className={cx('center')}>
          <div className={cx('modal-positioner')}>
            <div
              className={cx('modal-content', className, {
                appear: open,
                disappear: animate && !open,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;