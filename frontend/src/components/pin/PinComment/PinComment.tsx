import * as React from 'react';
import * as classNames from 'classnames/bind';
import Textarea from 'react-textarea-autosize';
import Button from '../../common/Button';
import InputTags from '../../write/InputTags';

const styles = require('./PinComment.scss');
const cx = classNames.bind(styles);

type Props = {

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
        return(
            <div className={cx('pin-comment')}>
                <div className={cx('comment-wrapper')}>
                    <div className={cx('comment-group')}>
                        <Textarea
                            minRows={3}
                            maxRows={10}
                            placeholder={`댓글을 작성해보세요.`}
                            className={cx('comment')}
                        />
                        <div className={cx('button-wrapper')}>
                            <Button theme='default' className={cx('comment-btn')} onClick={this.onSetTagInpuBox}>
                               태그 달기
                            </Button>
                            <Button theme='default' className={cx('comment-btn')}>
                               댓글 작성
                            </Button>
                        </div>
                        {
                            this.state.visible ? (
                                <InputTags 
                                    tags={["ts", "dss", "rdss"]}
                                    onInsert={() => console.log("test insert")}
                                    onRemove={() => console.log("test remove")}
                                /> 
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default PinComment;