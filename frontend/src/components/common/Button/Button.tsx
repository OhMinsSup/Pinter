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
}

const Button: React.SFC<Props> = ({
    to,
    theme,
    children,
    className,
}) => {
    const publicClassName = cx('Button', theme, className);
    if (to) {
        return (
            <Link to={to} className={publicClassName}>
                {children}
            </Link>
        );
    }
    return (
        <button className={publicClassName}>
            {children}
        </button>
    )
}

export default Button