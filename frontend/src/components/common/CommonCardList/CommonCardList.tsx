import * as React from 'react';
import CommonCard from '../CommonCard';

type Props = {
    pins: any[],
    onOpen(id: string): Promise<void>,
    onAction(name: 'like' | 'comment' | 'save', id: string, theme: string): Promise<any>,
}

const CommonCardList:React.SFC<Props> = ({ onOpen, pins, onAction }) => {
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
                onAction={onAction}
                onOpen={onOpen}
            />
        )
    })
    return (
        <React.Fragment>
            {pinList}
        </React.Fragment>
    )
}

export default CommonCardList;