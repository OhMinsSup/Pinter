import * as React from 'react';
import * as classNames from 'classnames/bind';

const LockIcon = require('react-icons/lib/md/lock-outline');
const styles = require('./LabelInput.scss');
const cx = classNames.bind(styles);

type Props = {
  label: string,
  value?: string,
  disabled?: boolean,
  required?: boolean,
  limit?: number,
  name?: string,
  type?: string,
  placeholder?: string,
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void,
};

const LabelInput: React.SFC<Props> = ({ 
    label, 
    value, 
    limit, 
    required, 
    disabled, 
    name, 
    type, 
    placeholder,
    onChange 
}) => {
    return (
        <div className={cx('RegisterLabelInput', { disabled })}>
        <div className="label">{label} {required && <span>*</span>}</div>
        <input value={value} type={type} name={name} placeholder={placeholder} onChange={onChange} disabled={disabled} />
        { disabled && (
            <div className="LockWrapper">
            <div className="lock">
                <LockIcon />
            </div>
            </div>
        )
        }
        { limit && (
            <div className="limit">
            { !value ? 0 : value.length } / {limit}
            </div>
        )}
        </div>
    );
};
/*
LabelInput.defaultProps = {
  value: '',
  disabled: false,
  required: false,
  limit: null,
};
*/
export default LabelInput;