import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import ListGroup from './group/ListGroup';
import WriteGroup from './group/WriteGroup';

type Props = {
    location: Location
}

const Groups: React.SFC<Props> = ({ }) => {    
    return (
        <Switch>
            <Route exact path='/groups' component={ListGroup} />
            <Route exact path='/groups/write' component={WriteGroup} />
        </Switch>
    )
}

export default Groups;