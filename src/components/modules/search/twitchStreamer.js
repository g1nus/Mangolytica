import React from 'react';

import Tick from 'components/svg/tick';
import TwitchLogo from 'components/svg/twitchLogo';

const TwitchStreamer = function({displayName, isLive, profilePicture, followers, description, selected}) {
  return (
      <div className='web-twitch-streamer-grid'>

        <p className='name' title={displayName}>{displayName}</p>
        <p className='followers'>{followers} followers</p>

        <div className='web-twitch-streamer-pic'>
          <img src={profilePicture} className='web-twitch-streamer-propic'/>
          {(isLive) ? 
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