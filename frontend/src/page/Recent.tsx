import * as React from 'react';
import ListTemplate from '../components/list/ListTemplate';
import RecentPinList from '../containers/list/RecentPinList';

const Recent = () => {
    return (
        <ListTemplate>
            <RecentPinList/>
        </ListTemplate>
    )
}

export default Recent;