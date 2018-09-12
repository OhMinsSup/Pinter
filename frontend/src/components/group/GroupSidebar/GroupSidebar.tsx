import * as React from 'react';
import * as classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const styles = require('./GroupSidebar.scss');
const cx = classNames.bind(styles);

const WigetCardStat = () => {
    return (
        <div className={cx('wiget-card-stat')}>
            <h3>그룹 상태</h3>
            <div className={cx('stat-wrapper')}>
                <div className={cx('stat-box')}>
                    <p>가입 수</p>
                    <h4>1000</h4>
                </div>
                <div className={cx('stat-box')}>
                    <p>포스트 수</p>
                    <h4>50</h4>
                </div>
            </div>
        </div>
    )
}

const  WigetCardPeople = () => {
    return (
        <div className={cx('wiget-card-people')}>
            <h3>가입 회원</h3>
            <div className={cx('people-wrapper')}>
                <div className={cx('people-box')}>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                    <Link className={cx('people')} to="/">
                        <img src="https://cdn.hashnode.com/res/hashnode/image/upload/w_70,h_70,c_thumb/v1524996196032/S1nPOfmTG.png" alt="thumbnail"/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const GroupSidebar = () => {
    return (
        <div className={cx('group-sidebar')}>
            <WigetCardStat />
            <WigetCardPeople />
        </div>
    )
}

export default GroupSidebar;