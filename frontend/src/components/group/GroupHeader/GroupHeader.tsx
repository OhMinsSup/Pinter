import * as React from 'react';
import * as classNames from 'classnames/bind';
import Button from 'src/components/common/Button';

const styles = require('./GroupHeader.scss');
const cx = classNames.bind(styles);

type Props = { }

const GroupHeader: React.SFC<Props> = ({  }) => {
    return (
        <div className={cx('group-header')}> 
            <section>
                <div className={cx('group-title')}>
                    <h1 className={cx('title')}>타이틀</h1>
                    <Button theme="default" className={cx('btn')}>수정</Button>
                    <Button theme="default" className={cx('btn')}>추가</Button>
                    <Button theme="default" className={cx('btn')}>삭제</Button>
                </div>
            </section>
            <p className={cx('active')}>공개</p>
        </div>
    )
}

export default GroupHeader;