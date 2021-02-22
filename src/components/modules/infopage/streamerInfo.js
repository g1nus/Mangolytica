import React, {useState, useEffect, useRef, useContext} from 'react';

import TwitchLogo from 'components/svg/twitchLogo';
import TwitterLogo from 'components/svg/twitterLogo';
import Star from 'components/svg/star';

import {AppContext} from 'components/providers/appProvider';
import {favoritesDao} from 'dao/favorites.dao';

const StreamerInfo = function({profilePicture, twitchName, twitchLoginName, twitchFollowers, twitchDescription, twitterLoginName, twitterFollowers,/*fake default value*/ starred = false}) {

  const [star, setStar] = useState(starred);

  const [loadSubmission, setLoadSubmission] = useState(false);

  //get data from global context
  const appConsumer = useContext(AppContext);

  //reference and mount cycle handler
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, []); 

  //function for submitting starred streamer
  async function submitStar() {
    setLoadSubmission(true);
    try{
      const submission = await favoritesDao.submitFavoriteFake(1111, '11111');
      if(isMounted.current) {console.log('done!'); setLoadSubmission(false); setStar(!star);}
    }catch (err){
      console.log(err);
    }

  }

  return (
    <div id='streamer-info'>

      <img src={profilePicture} id='streamer-pic' />

      <p id='name'>{twitchName}</p>

      <div id='streamer-socials-wrapper'>
        <div id='streamer-socials'>
          <div id='streamer-twitch'>
            <span id='twitch-inline-logo'><TwitchLogo /></span> <span className='text'>@{twitchLoginName} | <i>{twitchFollowers} followers</i></span>
          </div>
          <div id='streamer-twitter'>
            <span id='twitter-inline-logo'><TwitterLogo /></span> <span className='text'>@{twitterLoginName} | <i>{twitterFollowers} followers</i></span>
          </div>
        </div>
      </div>

      <p id='description'>
        {twitchDescription}
      </p>

      {
        (appConsumer.user) ?
          <div id='favorite-streamer-wrapper' onClick={submitStar} style={{pointerEvents: (loadSubmission) ? 'none' : '', opacity: (loadSubmission) ? '0.5' : '1.0'}}>
            <Star starred={star}/>
          </div>
        :
          <></>
      }

    </div>
  );
}

export default StreamerInfo;