import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Responsive from '../../common/Responsive';

const styles = require('./RegisterTemplate.scss');
const cx = classNames.bind(styles);

type Props = {
    form: React.ReactNode,
}

class RegisterTemplate extends React.Component<Props> {
    public render() {
        const { form } = this.props;
        return (
            <div className={cx('RegisterTemplate')}>
                <Responsive className={cx('MockHeader')}>
                <Link to="/" className={cx('brand')}>
                    Pinter
                </Link>
                <div className={cx('light')}>
                    <span>/</span>회원가입
                </div>
                </Responsive>
                <section className={cx('rest')}>
                <div className={cx('RegisterCard')}>
                    { form }
                </div>
                </section>
            </div>
        );
    }
}

export default RegisterTemplate;