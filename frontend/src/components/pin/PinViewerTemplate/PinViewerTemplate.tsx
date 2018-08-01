import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./PinViewerTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode,
}

const PinViewerTemplate: React.SFC<Props> = ({ children }) => {
    return (
        <div className={cx('pin-viewer-template')}>
            {children}
        </div>
    )
}

export default PinViewerTemplate;