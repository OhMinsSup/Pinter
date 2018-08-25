import * as React from 'react';
import * as classNames from 'classnames/bind';
import AutoTextarea from 'react-textarea-autosize';

const styles = require('./WriteItem.scss');
const cx = classNames.bind(styles);

type Props = {
    title: string,
    placeholder?: string,
    name?: string,
    type?: string,
    element?: React.ReactNode
}

const WriteItem: React.SFC<Props> = ({ title, name, placeholder, type, element }) => {
    return (
        <div className={cx('write-item')}>
            <label className={cx('input-title')}>
                <div className={cx('title')}>{title}</div>
            </label>
            {
                type === 'input' ? (
                    <div className={cx('input')}>
                        <span>
                            <AutoTextarea placeholder={placeholder} name={name}/>
                        </span>
                    </div>
                ) : (
                    <React.Fragment>
                        {element}
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default WriteItem;