import React, {useEffect, useState, useRef} from 'react';

import {streamerDao} from 'dao/streamer.dao';
import MangoStreamer from 'components/modules/search/mangoStreamer';
import Loading from 'components/svg/loading';

const MonitoredList = function() {

  //search results of our own platform
  const [mangoResults, setMangoResults] = useState(undefined);

  //reference and mount cycle handler
  const isMounted = useRef(true);
  useEffect(() => {

    const fetchData = async () => {
      try{
        
        let resultsOnline = await streamerDao.getMonitoredStreamers();
        console.log(resultsOnline);
        if(isMounted.current) setMangoResults(resultsOnline);
      
      }catch (err){
        console.log(err);
        if(isMounted.current) setMangoResults([{error: `failed`}]);
      }
    }

    fetchData();
    return () => {
      isMounted.current = false
    }
  }, []); 


  return (
    <div id='search-results-wrapper'>
      <div id='platform-results-wrapper'>
        <p id='title'>
          List of <span id='monitored-streams-hue-text'>Monitored</span> Streamers
        </p>
      {
        (mangoResults) ?
          <div className='mango-match-results monitored-list-wrapper'>
            {
              mangoResults.map((result, index) => <div key={index}> <MangoStreamer {...{twitchInfo: result.twitchInfo, twitterInfo: result.twitterInfo, available: result.enabled}} /> </div>)
            }
          </div>
        :
        <div id='monitored-loading'>
          <Loading />
        </div>
      }
      </div>
    </div>
  );
}

export default MonitoredList;