import * as React from 'react';
import * as classNames from 'classnames/bind';
import TagItem from '../TagItem';

const styles = require('./TagItemList.scss')
const cx = classNames.bind(styles);

type Props = {
  tags?: any[] | null,
};

const TagItemList: React.SFC<Props> = ({ tags }) => {
    return (
        <div className={cx('tag-item-list')}>
            <TagItem name="tag" count={8} key="1"/>
            <TagItem name="asdas" count={8} key="2"/>
            <TagItem name="asdas" count={8} key="3"/>
            <TagItem name="asdas" count={8} key="4"/>
            <TagItem name="fs" count={8} key="5"/>
            <TagItem name="qwewe" count={8} key="6"/>
            <TagItem name="12321" count={8} key="7"/>
            <TagItem name="rwewe" count={8} key="8"/>
            <TagItem name="123" count={8} key="9"/>
            <TagItem name="qww2" count={8} key="10"/>
            <TagItem name="2req" count={8} key="11"/>
            <TagItem name="3241" count={8} key="12"/>
            <TagItem name="123weqw" count={8} key="13"/>
            <TagItem name="rewrwe" count={8} key="14"/>
            <TagItem name="qwe" count={8} key="15"/>
            <TagItem name="wqew" count={8} key="16"/>
            <TagItem name="wwww" count={8} key="17"/>
            <TagItem name="123" count={8} key="18"/>
            <TagItem name="1233" count={8} key="19"/>
        </div>
    )
};

export default TagItemList;