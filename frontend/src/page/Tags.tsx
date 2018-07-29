import * as React from 'react';
import * as queryString from 'query-string';
import { match } from 'react-router-dom';
import TagsTab from '../components/tags/TagsTab';
import TagCurrentContainer from '../containers/tags/TagCurrentContainer';
import TagItemListContainer from '../containers/tags/TagItemListContainer';
import TagPinsCard from '../containers/recent/TagPinsCard';
import TagsTemplate from '../components/tags/TagTemplate/TagTemplate';

type MatchType = {
    tag: string
}

type Props = {
    location: Location,
    match: match<MatchType> 
}

const Tags: React.SFC<Props> = ({ location, match }) => {
    const { sort } = queryString.parse(location.search);
    const { tag } = match.params;
    return (
        <TagsTemplate>
            {tag ? (
                <React.Fragment>
                    <TagCurrentContainer tag={tag}/>
                    <TagPinsCard tag={tag} />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <TagsTab sort={sort} />
                    <TagItemListContainer sort={sort}/>
                </React.Fragment>
            )}
        </TagsTemplate>
    )
}

export default Tags;