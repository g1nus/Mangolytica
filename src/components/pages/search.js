import React from 'react';
import TrendingStreamers from 'components/modules/search/trendingStreamers';
import SearchButton from 'components/svg/searchButton';

const Search = function(props) {
  return (
    <div id='search-wrapper'>
      <img src='/mangologo.png' id='logo' />
      <form id='search-form'>
        <input type='text' placeholder='search for a streamer...' />
        <button type='submit'>
          <SearchButton />
        </button>
      </form>
      <TrendingStreamers />
    </div>
  );
}

export default Search;