import React, {useEffect, useState, useRef} from 'react';

import {searchDao} from 'dao/search.dao';
import Loading from 'components/svg/loading';
import MangoStreamer from 'components/modules/search/mangoStreamer';
import TwitchStreamer from 'components/modules/search/twitchStreamer';

const SearchResults = function(props) {

  //search results of our own platform
  const [searchResultsMango, setSearchResultsMango] = useState(undefined);
  //search results from the web
  const [searchResults, setSearchResults] = useState(undefined);
  //query to search
  const [query, setQuery] = useState([]);

  //reference and mount cycle handler
  const isMounted = useRef(true);
  useEffect(() => {
    //get the query string from the browser url
    const query = window.location.hash.substring(window.location.hash.indexOf('query=') + 6).match(/[^(?|&|=)]*/)[0];
    setQuery(query);

    const fetchData = async () => {
      try{
        let resultsMango = await searchDao.searchStreamerOnMango(query);
        if(isMounted.current) setSearchResultsMango(resultsMango.data);
        
        let resultsOnline = await searchDao.searchStreamerOnLine(query);
        if(isMounted.current) setSearchResults(resultsOnline.results.map((res) => ({...res, selected: false})));
      
      }catch (err){
        console.log(err);
        if(isMounted.current) setSearchResults([{error: `failed`}]);
      }
    }

    fetchData();
    return () => {
      isMounted.current = false
    }
  }, []); 

  //function for selection of streamer
  function selectStreamer(index) {
    let newStreamerList = searchResults.map((streamer,idx) => {
      streamer.selected = false;
      if(idx === index){
        streamer.selected = true;
      }
      return streamer;
    });
    setSearchResults(newStreamerList);
  }

  return (
    <div id='search-results-wrapper'>
      <p className='title'>Results for "<span>{query}</span>" on our plaftorm</p>

      <div id='platform-results-wrapper'>
      {
       (!searchResultsMango) ? 
        <div id='mango-match-loading'> 
          <Loading />   
        </div> 
      : 
        ((searchResultsMango.length === 0) ? 
          <p id='no-mango-match'>nothing matched in our database</p> 
        : 
          <div id='mango-match-results'>
            {
              searchResultsMango.map((result, index) => <div key={index}> <MangoStreamer {...result} /> </div>)
            }
        </div>)
      }
      </div>

      <p className='title'>Results for "<span>{query}</span>" on the web</p>
      {(searchResults) ? <p id='title-tip'>Please select the Twitch and Twitter official accounts of the person you're looking for</p> : <></>}

      <div id='web-results-wrapper'>
        {(!searchResults) ? 
          <div id='web-results-loading'> 
            <Loading />
          </div> 
        : 
          ((searchResults.length === 0) ? 
            <p id='no-web-results'>nothing matched in the web</p> 
          :
            <>
            <div id='twitch-results'>
              {searchResults.map((result, index) => {
                return (
                  <div className='twitch-streamer' key={index} onClick={() => {selectStreamer(index)}}>
                    <TwitchStreamer {...result} />
                  </div>
                );
              })}
            </div>

            <div id='twitter-results'>

            </div>
          </>)
        }
      </div>
    </div>
  );
}

export default SearchResults;