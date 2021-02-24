import React, {useState, useEffect, useRef, useContext} from 'react';

import TwitchLogo from 'components/svg/twitchLogo';
import TwitterLogo from 'components/svg/twitterLogo';
import Star from 'components/svg/star';
import {getToken} from 'services/firebase';

import {AppContext} from 'components/providers/appProvider';
import {favoritesDao} from 'dao/favorites.dao';

const StreamerInfo = function({profilePicture, twitchName, twitchLoginName, twitchFollowers, twitchDescription, twitterLoginName, twitterFollowers, streamerId, starred}) {

  const [star, setStar] = useState({loading: true, flagged: false});

  //reference and mount cycle handler
  const isMounted = useRef(true);

  //get data from global context
  const appConsumer = useContext(AppContext);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const token = await getToken();
        let favoriteStreamers = await favoritesDao.fetchFavorites(token);
        let isFavorite = favoriteStreamers.some((streamer) => streamer.twitterInfo.loginName === twitterLoginName);
        if(isMounted.current) setStar({loading: false, flagged: isFavorite});
      
      }catch (err){
        console.log(err);
        if(isMounted.current) setStar({loading: false, flagged: false});
      }
    }

    if(appConsumer.user){
      fetchData();
    }

  }, [appConsumer.user]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  //function for submitting starred streamer
  async function submitStar() {
    console.log('submitting')
    setStar({...star, loading: true});
    try{
      const token = await getToken();
      const submission = await favoritesDao.submitFavoriteFake(token, streamerId, twitterLoginName);
      if(isMounted.current) {setStar({loading: false, flagged: !star.flagged})}
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
          <div id='favorite-streamer-wrapper' onClick={submitStar} style={{pointerEvents: (star.loading) ? 'none' : '', opacity: (star.loading) ? '0.5' : '1.0'}}>
            <Star starred={star.flagged}/>
          </div>
        :
          <></>
      }

    </div>
  );
}

export default StreamerInfo;