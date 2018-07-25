import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./Button.scss');
const cx = classNames.bind(styles);

type Props = {
    theme: 'default' | 'outline' | 'paper' | 'noline',
    to?: string | null,
    children: React.ReactNode,
    className?: string,
    onClick?(): any 
}

const Button: React.SFC<Props> = ({
    to,
    theme,
    children,
    className,
    ...rest
}) => {
    const publicClassName = cx('Button', theme, className);
    if (to) {
        return (
            <Link to={to} className={publicClassName} {...rest}>
                {children}
            </Link>
        );
    }
    return (
        <button className={publicClassName} {...rest}>
            {children}
        </button>
    )
}

export default Button