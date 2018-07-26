import * as React from 'react';
import * as queryString from 'query-string';
import { match } from 'react-router-dom';
import TagsTab from '../components/tags/TagsTab';
import TagCurrentContainer from '../containers/tags/TagCurrentContainer';
import TagItemListContainer from '../containers/tags/TagItemListContainer';
import TagsTemplate from '../components/tags/TagTemplate/TagTemplate';

type Props = {
    location: Location,
    match: match<any> 
}

const Tags: React.SFC<Props> = ({ location, match }) => {
    const { sort } = queryString.parse(location.search);
    const { tag } = match.params;
    return (
        <TagsTemplate>
            {tag ? (
                <React.Fragment>
                    <TagCurrentContainer />
                    태그 포스트
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <TagsTab sort={sort} />
                    <TagItemListContainer/>
                </React.Fragment>
            )}
        </TagsTemplate>
    )
}

export default Tags;