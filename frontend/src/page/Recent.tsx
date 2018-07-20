import * as React from 'react';
import RecentTemplate from '../components/recent/RecentTemplate';
import RecentPinsCard from '../containers/recent/RecentPinsCard';

const Recent = () => {
    return (
        <RecentTemplate>
            <RecentPinsCard />
        </RecentTemplate>
    );
}

export default Recent;