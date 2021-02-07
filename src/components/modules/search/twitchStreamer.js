import React from 'react';

import Tick from 'components/svg/tick';
import TwitchLogo from 'components/svg/twitchLogo';

const TwitchStreamer = function({display_name, is_live, thumbnail_url, followers, description, selected}) {
  return (
      <div className='web-twitch-streamer-grid'>

        <p className='name'>{display_name}</p>
        <p className='followers'>{followers} followers</p>

        <div className='web-twitch-streamer-pic'>
          <img src={thumbnail_url} className='web-twitch-streamer-propic'/>
          {(is_live) ? 
            (<>
              <div className='live-dot'></div>
              <div className='live-dot-ripple'></div>
            </>) 
          : 
            <></>
          }
          <div className='twitch-badge'><TwitchLogo /></div>
          {(selected) ? <div className='selected'><div className='selected-bg'></div><Tick /></div> : <></>}
        </div>

        <p className='description'>
          {(description) ? <>{description}</> : <>No description...</>}
        </p>
      </div>
  );
}

export default TwitchStreamer;