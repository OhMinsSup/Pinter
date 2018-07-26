import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SettingInput.scss');
const cx = classNames.bind(styles);

type Props = {
    label?: string,
    value?: string,
    name?: string,
    username?: string,
    email?: string,
    onChange?(): void,
}

const SettingInput = ({ label, name, value, onChange }: Props) => {
    return (
        <div className={cx('input-wrapper')}>
            <strong className={cx('input-label')}>
                <label>{label}</label>
            </strong>
            <input maxLength={100} placeholder="변경할 이름을 적어주세요" autoComplete="off" className={cx('inputs')} name={name} value={value} onChange={onChange}/>
        </div>
    );
}

export default SettingInput;