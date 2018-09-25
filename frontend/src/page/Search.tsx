import * as React from 'react';
import SearchTemplate from '../components/search/SearchTemplate';
import SearchNavHeader from '../containers/search/SearchNavHeader';
import HeaderContainer from '../containers/base/HeaderContainer';
import SearchContent from '../containers/search/SearchContent';

const Search = () => {
    return (
        <React.Fragment>
            <HeaderContainer />
            <SearchTemplate
                header={<SearchNavHeader/>}
            >
                <SearchContent/>
            </SearchTemplate>
        </React.Fragment>
    )
}

export default Search;