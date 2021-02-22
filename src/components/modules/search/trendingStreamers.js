import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

import {streamerDao} from 'dao/streamer.dao'

const TrendingStreamers = function(props) {

  const [trending, setTrending] = useState(undefined);

  //reference and mount cycle handler
  const isMounted = useRef(true);

  useEffect(() => {

    const fetchData = async () => {
      try{
        let trendingStreamers = await streamerDao.fetchTrending();
        if(isMounted.current) setTrending(trendingStreamers);
      
      }catch (err){
        console.log(err);
        if(isMounted.current) setTrending([{error: `failed`}]);
      }
    }

    fetchData();

    return () => {
      isMounted.current = false;
    };

  }, []);

  return (
    <div id='trending-streamers'>
      {(trending) ?
        <>
          <p>Trending Streamers</p>
          <div id='img-wrapper'>
            {trending.map((streamer, idx) => (
              <Link to={`/streamer/${streamer.twitterInfo.loginName}`} key={idx} >
                <img src={streamer.twitchInfo.profilePicture} className='streamer-propic-trending' />
              </Link>
            ))}
          </div>
        </>
      :
        <></>
      }
    </div>
  );
}

export default TrendingStreamers;