import * as React from 'react';
import * as classNames from 'classnames/bind';
import PerfectScrollbar from 'perfect-scrollbar';
import ModalWrapper from '../../common/ModalWrapper';

const styles = require('./NoticeBoxModal.scss');
const cx = classNames.bind(styles);

type Props = {
    open?: boolean,
    children: React.ReactNode,
    onClick(): void,
}

class NoticeBoxModal extends React.Component<Props> {
    public content: any = null;
    public ps: any = null;

    public setupScrollbar(): void {
        if (!this.content) return;
    
        if (this.ps) {
          this.ps.destroy();
          this.ps = null;
        }
    
        this.ps = new PerfectScrollbar(this.content);
        (window as any).ps = this.ps;
      }
    
    public initialize(): void {
        this.setupScrollbar();
    }
      
    public componentDidMount() {
        this.initialize();
    }
    
    public componentDidUpdate(prevProps: Props) {
        if (!prevProps.open && this.props.open) {
          this.initialize();
        }
        this.setupScrollbar();
    }

    public render() {
        const { children, onClick } = this.props;
        return (
        <ModalWrapper className={cx('notice-box-modal')} open={true}>
            <h2>알림</h2>
            <div className={cx("content")} ref={(ref) => { this.content = ref; }}>
                {children}
            </div>
            <div className={cx("foot")}>
            <div className={cx("button", "cancel")} onClick={onClick}>
                닫기
            </div>
            </div>
        </ModalWrapper>
        )
    }
}

export default NoticeBoxModal;