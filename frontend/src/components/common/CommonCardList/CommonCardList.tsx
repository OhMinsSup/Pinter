import * as React from 'react';
import * as classNames from 'classnames/bind';
import CommonCard from '../CommonCard';

const styles = require('./CommonCardList.scss');
const cx = classNames.bind(styles);

type Props = {
    pins: any[],
    theme?: string,
    onOpen(id: string): Promise<void>,
}

const CommonCardList:React.SFC<Props> = ({ onOpen, pins, theme }) => {
    const pinList = pins.map((pin) => {
        const { 
            comments,
            likes,
            user: {
                displayName,
                thumbnail,
                username,
            },
            urls,
            body,
            createdAt,
            relationUrl,
            pinId,
        } = pin;
        return (
            <CommonCard
                comments={comments}
                likes={likes}
                displayName={displayName}
                thumbnail={thumbnail}
                urls={urls}
                body={body}
                username={username}
                relationUrl={relationUrl}
                key={pinId}
                id={pinId}
                createdAt={createdAt}
                onOpen={onOpen}
                theme={theme}
            />
        )
    })
    return (
        <div className={cx(theme)}>
            {pinList}
        </div>
    )
}

export default CommonCardList;