import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./LandingTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    form: React.ReactNode
}

const LandingTemplate: React.SFC<Props> = ({ form }) => {
    return (
        <div className={cx('Landing')}>
            <div className={cx('LandingTemplate')}>
                <div className={cx('FormBox')}>
                    { form }
                </div>
            </div>
        </div>
    );
}

export default LandingTemplate;