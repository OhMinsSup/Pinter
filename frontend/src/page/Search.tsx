import * as React from 'react';
import SearchTemplate from '../components/search/SearchTemplate';
import SearchNavHeader from '../containers/search/SearchNavHeader';
import HeaderContainer from '../containers/base/HeaderContainer';
import SearchContent from '../containers/search/SearchContent';
import SearchList from '../containers/search/SearchList';
import { match } from 'react-router-dom';

type Props = {
    match: match<string>
}

const Search: React.SFC<Props> = ({ match }) => {
    const urlSplit = match.url.split("/");
    const type = urlSplit[urlSplit.length - 1];  
    const searchType = type === 'search' ? 'pin' : type;

    return (
        <React.Fragment>
            <HeaderContainer />
            <SearchTemplate
                header={<SearchNavHeader/>}
                search={<SearchContent/>}
            >
                <SearchList type={searchType}/>
            </SearchTemplate>
        </React.Fragment>
    )
}

export default Search;