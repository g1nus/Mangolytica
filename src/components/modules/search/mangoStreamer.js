import React from 'react';
import {Link} from 'react-router-dom';

import TwitchLogo from 'components/svg/twitchLogo';
import TwitterLogo from 'components/svg/twitterLogo';

const MangoStreamer = function({twitchInfo, twitterInfo, available}) {
  return (
    <Link className='mango-streamer' style={{opacity: (available) ? '1.0' : '0.5', pointerEvents: (available)? '' : 'none'}} to={`/streamer/${twitterInfo.loginName}`}>
      <div className='mango-streamer-grid' title={(available) ? '' : 'we don\'t have anough data about this user yet'}>

        <p className='name'>{twitchInfo.displayName}</p>

        <div className='mango-streamer-pic'>
          <img src={twitchInfo.profilePicture} className='mango-streamer-propic' />
        </div>

        <div className='mango-streamer-twitch'>
          <span className='twitch-inline-logo'><TwitchLogo /></span> <span className='text'>{twitchInfo.loginName}</span>
        </div>
        <div className='mango-streamer-twitter'>
          <span className='twitter-inline-logo'><TwitterLogo /></span> <span className='text'>{twitterInfo.loginName}</span>
        </div>

        {
          (available) ? <></>
          :
            <p className='mango-streamer-availabilty'>
              We don't have enough data yet. Check later...
            </p>
        }
      </div>
    </Link>
  );
}

export default MangoStreamer;