import React from 'react';
import {Link} from 'react-router-dom';

import TwitchLogo from 'components/svg/twitchLogo';
import TwitterLogo from 'components/svg/twitterLogo';

const MangoStreamer = function({name, img_url, twitch, twitter, createdAt}) {
  return (
    <Link className='mango-streamer' to='/'>
      <div className='mango-streamer-grid'>

        <p className='name'>{name}</p>

        <div className='mango-streamer-pic'>
          <img src={img_url} className='mango-streamer-propic' />
        </div>

        <div className='mango-streamer-socials-wrapper'>
          <div className='mango-streamer-socials'>
            <div className='mango-streamer-twitch'>
              <span className='twitch-inline-logo'><TwitchLogo /></span> <span className='text'>{twitch.username}</span>
            </div>
            <div className='mango-streamer-twitter'>
              <span className='twitter-inline-logo'><TwitterLogo /></span> <span className='text'>{twitter.username}</span>
            </div>
          </div>
        </div>

        <p className='mango-streamer-created'>
          Created at: {createdAt.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

export default MangoStreamer;