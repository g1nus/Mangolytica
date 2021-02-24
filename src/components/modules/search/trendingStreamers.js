import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import {AppContext} from 'components/providers/appProvider';

const TrendingStreamers = function(props) {

  //get data from global context
  const appConsumer = useContext(AppContext);

  return (
    <div id='trending-streamers'>
      {(appConsumer.trending) ?
        <>
          <p>Trending Streamers</p>
          <div id='img-wrapper'>
            {appConsumer.trending.map((streamer, idx) => (
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