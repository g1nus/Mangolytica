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
  const [searchResultsTwitch, setSearchResultsTwitch] = useState(undefined);

  //fake twitter search results
  const [searchResultsTwitter, setSearchResultsTwitter] = useState(undefined);
  //loading submission flag
  const [loadSubmission, setLoadSubmission] = useState({flag: false, msg: 'Start Monitoring'});

  //query to search
  const [query, setQuery] = useState([]);

  //reference and mount cycle handler
  const isMounted = useRef(true);
  useEffect(() => {
    //get the query string from the browser url
    const urlQuery = window.location.hash.substring(window.location.hash.indexOf('query=') + 6).match(/[^(?|&|=)]*/)[0];
    setQuery(urlQuery.split('%20').join(' '));

    const fetchData = async () => {
      try{
        
        let resultsOnline = await searchDao.searchStreamerOnLine(urlQuery);
        if(isMounted.current) setSearchResultsTwitch(resultsOnline.twitchResults.map((res) => ({...res, selected: false})));
        if(isMounted.current) setSearchResultsTwitter(resultsOnline.twitter_results.map((res) => ({...res, selected: false})));
        if(isMounted.current) setSearchResultsMango(resultsOnline.monitored);
      
      }catch (err){
        console.log(err);
        if(isMounted.current) setSearchResultsTwitch([{error: `failed`}]);
      }
    }

    fetchData();
    return () => {
      isMounted.current = false
    }
  }, []); 

  //function for selection of streamer
  function selectStreamer(index) {
    let newStreamerList = searchResultsTwitch.map((streamer,idx) => {
      streamer.selected = false;
      if(idx === index){
        streamer.selected = true;
      }
      return streamer;
    });
    setSearchResultsTwitch(newStreamerList);
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
    setLoadSubmission({flag: true, msg: 'Submitting Users...'});
    const twitchStreamer = searchResultsTwitch.find((streamer) => streamer.selected);
    const twitterUser = searchResultsTwitter.find((user) => user.selected);

    const resp = await searchDao.submitUsers(twitchStreamer.streamerId, twitterUser.user_screen, twitchStreamer.loginName);

    if(resp.SUCCESS && resp.SUCCESS !== 'We are already monitoring this profile'){
      history.push(`/?submitted=true`);
    }else{
      console.log('ERRROR');
      console.log(resp);
      let newData = searchResultsTwitch.map((info) => ({...info, selected: false}))
      console.log('new twitch data', newData);
      setSearchResultsTwitch([...newData])
      newData = searchResultsTwitter.map((info) => ({...info, selected: false}))
      setSearchResultsTwitter([...newData])
      console.log('new twitter data', newData);
      setLoadSubmission({flag: false, msg: 'We encontered an error...'});
      setTimeout(() => {
        setLoadSubmission({flag: false, msg: 'Start Monitoring'});
      }, 1000);
    }
    
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
          <div className='mango-match-results'>
            {
              searchResultsMango.map((result, index) => <div key={index}> <MangoStreamer {...{twitchInfo: result.twitchInfo, twitterInfo: result.twitterInfo, available: result.monitored}} /> </div>)
            }
        </div>)
      }
      </div>

      <p className='title'>Results for "<span>{query}</span>" on the web</p>
      {(searchResultsTwitch && searchResultsTwitter) ? <p id='title-tip'>Please select the Twitch and Twitter official accounts of the person you're looking for</p> : <></>}

      <div id='web-results-wrapper'>
        {(!searchResultsTwitch || !searchResultsTwitter) ? 
          <div id='web-results-loading'> 
            <Loading />
          </div> 
        : 
          ((searchResultsTwitch.length === 0 || searchResultsTwitter.length === 0) ? 
            <p id='no-web-results'>nothing matched in the web</p> 
          :
            <>
            <div id='twitch-results'>
              {searchResultsTwitch.map((result, index) => {
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
      {(loadSubmission.msg === 'We encontered an error...') ?
        <button id='submit-users' style={{cursor: 'not-allowed', pointerEvents: 'none'}} >
          {loadSubmission.msg}
        </button>
        : 
        (searchResultsTwitter?.some(user => user.selected) && searchResultsTwitch?.some(streamer => streamer.selected) && !loadSubmission.flag) ?
          <button id='submit-users' onClick={() => {submitMonitor()}}>
            {loadSubmission.msg}
          </button>
          : ((searchResultsTwitter?.some(user => user.selected) && searchResultsTwitch?.some(streamer => streamer.selected)) ? 
            <button id='submit-users'>
              {loadSubmission.msg}
            </button>
          :
          <></>
        )
      }
    </div>
  );
}

export default SearchResults;