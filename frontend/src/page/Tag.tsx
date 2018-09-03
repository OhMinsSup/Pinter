import * as React from 'react';
import * as queryString from 'query-string';
import { match } from 'react-router-dom';
import TagsTab from '../components/tag/TagsTab';
import TagCurrentContainer from '../containers/tag/TagCurrentContainer';
import TagItemListContainer from '../containers/tag/TagItemListContainer';
import TagPinList from '../containers/list/TagPinList';
import TagsTemplate from '../components/tag/TagTemplate/TagTemplate';

type Props = {
    location: Location,
    match: match<{ tag: string }> 
}

const Tag: React.SFC<Props> = ({ location, match }) => {
    const { sort } = queryString.parse(location.search);
    const { tag } = match.params;
    
    return (
        <TagsTemplate>
            {tag ? (
                <React.Fragment>
                    <TagCurrentContainer tag={tag}/>
                    <TagPinList tag={tag} />
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

export default Tag;