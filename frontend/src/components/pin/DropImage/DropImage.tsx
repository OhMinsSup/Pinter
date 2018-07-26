import * as React from 'react';
import * as classNames from 'classnames/bind';

const UploadIcon = require('react-icons/lib/md/cloud-upload');
const styles = require('./DropImage.scss');
const cx = classNames.bind(styles);

type Props = {
    onDragEnter(e: any): void,
    onDragLeave(e: any): void,
    onDrop(e: any): void,
    onPaste(file: any): void,
    onUploadClick(): void
  };
  

class DropImage extends React.Component<Props> {
    public componentDidMount() {
        this.applyListeners();
      }
    
    public onDragOver = (e: any) => {
        e.preventDefault();
    };
    
    public onPaste = (e: any) => {
        const { items } = e.clipboardData || e.originalEvent.clipboardData;
        if (items.length !== 2) return;
        if (items[1].kind !== 'file') return;
        const file = items[1].getAsFile();
        this.props.onPaste(file);
        e.preventDefault();
    };
    
    public applyListeners = () => {
        const { onDragEnter, onDragLeave, onDrop } = this.props;
        if (window) {
          window.addEventListener('drop', onDrop);
          window.addEventListener('dragenter', onDragEnter);
          window.addEventListener('dragleave', onDragLeave);
          window.addEventListener('dragover', this.onDragOver);
        }
        if (document && document.body) {
          document.body.addEventListener('paste', this.onPaste);
        }
    };
    
    public removeListeners = () => {
        const { onDragEnter, onDragLeave, onDrop } = this.props;
        if (window) {
          window.removeEventListener('drop', onDrop);
          window.removeEventListener('dragenter', onDragEnter);
          window.removeEventListener('dragleave', onDragLeave);
          window.removeEventListener('dragover', this.onDragOver);
        }
        if (document && document.body) {
          document.body.removeEventListener('paste', this.onPaste);
        }
    };
    
    public componentWillUnmount() {
        this.removeListeners();
    }    

    public render() {
        return (
            <div className={cx('upload-mask')} onClick={this.props.onUploadClick}>
                <UploadIcon />
                <h3>파일을 드래그하여 업로드 하세요</h3>
            </div>
        )
    }
}

export default DropImage;