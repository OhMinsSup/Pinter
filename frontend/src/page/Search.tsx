import * as React from 'react';
import SearchTemplate from '../components/search/SearchTemplate';
import SearchNavHeader from '../containers/search/SearchNavHeader';
import HeaderContainer from '../containers/base/HeaderContainer';

const Search = () => {
    return (
        <React.Fragment>
            <HeaderContainer />
            <SearchTemplate
                header={<SearchNavHeader/>}
            >
                sdsds
            </SearchTemplate>
        </React.Fragment>
    )
}

export default Search;