import * as React from 'react';
import * as classNames from 'classnames/bind';
import PinCard from '../PinCard';

const styles = require('./PinCardList.scss');
const cx = classNames.bind(styles);

type Props = {
    pins: any[]
}

const PinCardList: React.SFC<Props> = ({ pins }) => {
    const pinsList = pins.map(
        (pin, index) => {
            const { 
                pinId, 
                relation_url, 
                description, 
                urls, 
                createdAt, 
                tags, 
                likes, 
                comments,
                user: {
                    displayName,
                    thumbnail 
                }
            } = pin;

            return (
                <PinCard
                    key={index}
                    id={pinId}
                    relationUrl={relation_url}
                    description={description}
                    urls={urls}
                    createdAt={createdAt}
                    likes={likes}
                    comments={comments}
                    tags={tags}
                    displayName={displayName}
                    thumbnail={thumbnail}
                />
            )
        }
    )
    
    return (
        <div className={cx('pin-card-list')}>
            {pinsList}
        </div>
    );
}

export default PinCardList;