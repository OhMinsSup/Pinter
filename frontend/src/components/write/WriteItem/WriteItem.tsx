import * as React from 'react';
import * as classNames from 'classnames/bind';
import Textarea from 'react-textarea-autosize';

const styles = require('./WriteItem.scss');
const cx = classNames.bind(styles);

type Props = {
    title: string,
    placeholder?: string,
    name?: string,
    type?: string,
    element?: React.ReactNode,
    value?: string,
    onChange?(e: any): void,
}

const WriteItem: React.SFC<Props> = ({ title, name, placeholder, type, element, onChange, value }) => {
    return (
        <div className={cx('write-item')}>
            <label className={cx('input-title')}>
                <div className={cx('title')}>{title}</div>
            </label>
            {
                type === 'input' ? (
                    <div className={cx('input')}>
                        <span>
                            <Textarea placeholder={placeholder} name={name} value={value} onChange={onChange}/>
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