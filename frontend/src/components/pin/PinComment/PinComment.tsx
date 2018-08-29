import * as React from 'react';
import * as classNames from 'classnames/bind';
import Textarea from 'react-textarea-autosize';
import Button from '../../common/Button';
import InputTags from '../../write/InputTags';

const styles = require('./PinComment.scss');
const cx = classNames.bind(styles);

type Props = {
    value: string,
    tags: string[],
    onChangeComment(e: any): void,
    onInsert(tag: string): void, 
    onRemove(tag: string):void,
    onSubmit(): Promise<void>,
    onClick(): void,
}   

type State = {
    visible: boolean
}

class PinComment extends React.Component<Props, State> {
    public state = {
        visible: false
    }

    public onSetTagInpuBox = () => {
        const { visible } = this.state;
        this.setState({
            visible: visible ? false : true
        })
    }

    public render() {
        const { 
            value, 
            tags, 
            onChangeComment, 
            onInsert, 
            onRemove, 
            onSubmit,
            onClick
        } = this.props;
        return(
            <div className={cx('pin-comment')}>
                <div className={cx('comment-wrapper')}>
                    <div className={cx('comment-group')}>
                        <Textarea
                            minRows={3}
                            maxRows={10}
                            value={value}
                            name='value'
                            onChange={onChangeComment}
                            placeholder={`댓글을 작성해보세요.`}
                            className={cx('comment')}
                        />
                        <div className={cx('button-wrapper')}>
                            <Button theme='default' className={cx('comment-btn')} onClick={this.onSetTagInpuBox}>
                               태그
                            </Button>
                            <Button theme='default' className={cx('comment-btn')} onClick={onSubmit}>
                               댓글 작성
                            </Button>
                        </div>
                        {
                            this.state.visible ? (
                                <InputTags 
                                    tags={tags}
                                    onInsert={onInsert}
                                    onRemove={onRemove}
                                /> 
                            ) : null
                        }
                    </div>
                </div>
                <div className={cx('comment-visible-btn')}>
                    <Button theme="noline" onClick={onClick}>댓글 열기</Button>
                </div>
            </div>
        )
    }
}

export default PinComment;