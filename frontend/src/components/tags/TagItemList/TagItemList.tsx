import * as React from 'react';
import * as classNames from 'classnames/bind';
import TagItem from '../TagItem';

const styles = require('./TagItemList.scss')
const cx = classNames.bind(styles);

type Props = {
  tags: any[] | null,
  onSelectTag: (info: any) => void
};

const TagItemList: React.SFC<Props> = ({ tags, onSelectTag }) => {
    if (!tags) return null;
    const tagList = tags.map(({ name, count, tagId }) => {
        return <TagItem name={name} count={count} key={tagId} onClick={onSelectTag}/>
    })
    return (
        <div className={cx('tag-item-list')}>
            {tagList}
        </div>
    )
};

export default TagItemList;