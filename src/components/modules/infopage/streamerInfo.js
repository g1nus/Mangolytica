import React from 'react';

import TwitchLogo from 'components/svg/twitchLogo';
import TwitterLogo from 'components/svg/twitterLogo';

const StreamerInfo = function({profilePicture, displayName, loginName, followers, description}) {

return (
  <div id='streamer-info'>

    <img src={profilePicture} id='streamer-pic' />

    <p id='name'>{displayName}</p>

    <div id='streamer-socials-wrapper'>
      <div id='streamer-socials'>
        <div id='streamer-twitch'>
          <span id='twitch-inline-logo'><TwitchLogo /></span> <span className='text'>@{loginName} | <i>{followers} followers</i></span>
        </div>
        <div id='streamer-twitter'>
          <span id='twitter-inline-logo'><TwitterLogo /></span> <span className='text'>@user_1 | <i>1273 followers</i></span>
        </div>
      </div>
    </div>

    <p id='description'>
      {description}
    </p>

  </div>
);
}

export default StreamerInfo;