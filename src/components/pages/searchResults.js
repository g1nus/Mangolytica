import React, {useEffect, useState, useRef} from 'react';
import { useHistory } from "react-router-dom";

import {searchDao} from 'dao/search.dao';
import Loading from 'components/svg/loading';
import MangoStreamer from 'components/modules/search/mangoStreamer';
import TwitchStreamer from 'components/modules/search/twitchStreamer';
import TwitterUser from 'components/modules/search/twitterUser';

const SearchResults = function(props) {

  //history ref
  let history = useHistory();

  //search results of our own platform
  const [searchResultsMango, setSearchResultsMango] = useState(undefined);
  //search results from the web
  const [searchResults, setSearchResults] = useState(undefined);

  //fake twitter search results
  const [searchResultsTwitter, setSearchResultsTwitter] = useState(undefined);
  //loading submission flag
  const [loadSubmission, setLoadSubmission] = useState(false);

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

        let fakeResultsTwitter = await searchDao.searchTwitterFake(query);
        if(isMounted.current) setSearchResultsTwitter(fakeResultsTwitter.map((res) => ({...res, selected: false})));
      
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

  //function for selection of twitter user
  function selectTwitterUser(index) {
    let newTwitterUserList = searchResultsTwitter.map((twitterUser,idx) => {
      twitterUser.selected = false;
      if(idx === index){
        twitterUser.selected = true;
      }
      return twitterUser;
    });
    setSearchResultsTwitter(newTwitterUserList);
  }

  //function for submitting the new users to monitor
  async function submitMonitor() {
    setLoadSubmission(true);
    const twitchStreamer = searchResults.find((streamer) => streamer.selected);
    const twitterUser = searchResultsTwitter.find((user) => user.selected);

    console.log('selected the following users to monitor', twitchStreamer, twitterUser);

    const resp = await searchDao.submitUsersFake(twitchStreamer, twitterUser);
    console.log(resp);

    history.push(`/?submitted=true`);
    
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
      {(searchResults && searchResultsTwitter) ? <p id='title-tip'>Please select the Twitch and Twitter official accounts of the person you're looking for</p> : <></>}

      <div id='web-results-wrapper'>
        {(!searchResults || !searchResultsTwitter) ? 
          <div id='web-results-loading'> 
            <Loading />
          </div> 
        : 
          ((searchResults.length === 0 || searchResultsTwitter.length === 0) ? 
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
              {searchResultsTwitter.map((result, index) => {
                  return (
                    <div className='twitter-user' key={index} onClick={() => {selectTwitterUser(index)}}>
                      <TwitterUser {...result} />
                    </div>
                  );
                })}
            </div>
          </>)
        }
      </div>
      {(searchResultsTwitter?.some(user => user.selected) && searchResults?.some(streamer => streamer.selected) && !loadSubmission) ?
        <button id='submit-users' onClick={() => {submitMonitor()}}>
          Start Monitoring
        </button>
        : ((searchResultsTwitter?.some(user => user.selected) && searchResults?.some(streamer => streamer.selected)) ? 
            <button id='submit-users'>
              Submitting Users...
            </button>
          :
          <></>
        )
      }
    </div>
  );
}

export default SearchResults;