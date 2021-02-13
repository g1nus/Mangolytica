import React from 'react';

import Tick from 'components/svg/tick';
import TwitterLogo from 'components/svg/twitterLogo';
import TwitterVerified from 'components/svg/twitterVerified';

const TwitterUser = function({user_screen, verified, profile_image, followers_count, description, selected}) {
  return (
      <div className='web-twitter-user-grid'>

        <p className='name'>{user_screen}</p>
        <p className='followers'>{followers_count} followers</p>

        <div className='web-twitter-user-pic'>
          <img src={profile_image} className='web-twitter-user-propic'/>
          {(verified) ? 
            (<div className='verified'>
              <TwitterVerified />
            </div>) 
          : 
            <></>
          }
          <div className='twitter-badge'><TwitterLogo /></div>
          {(selected) ? <div className='selected'><div className='selected-bg'></div><Tick /></div> : <></>}
        </div>

        <p className='description'>
          {(description) ? <>{description}</> : <>No description...</>}
        </p>
      </div>
  );
}

export default TwitterUser;