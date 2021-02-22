import React, {useRef, useEffect, useState, useContext} from 'react';

import {AppContext} from 'components/providers/appProvider';
import {favoritesDao} from 'dao/favorites.dao';
import {getToken} from 'services/firebase';
import { Link } from 'react-router-dom';

const FavouriteStreamers = function(props) {

  const [favorites, setFavorites] = useState(undefined);

  //reference and mount cycle handler
  const isMounted = useRef(true);

  //get data from global context
  const appConsumer = useContext(AppContext);

  useEffect(() => {

    const fetchData = async () => {
      try{
        const token = await getToken();
        let favoriteStreamers = await favoritesDao.fetchFavorites(token);
        if(isMounted.current) setFavorites(favoriteStreamers);
      
      }catch (err){
        console.log(err);
        if(isMounted.current) setFavorites([{error: `failed`}]);
      }
    }

    if(appConsumer.user){
      fetchData();
    }else{
      setFavorites(undefined);
    }

  }, [appConsumer.user]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div id='favourite-streamers'>
      {(favorites) ?
        <>
          <p>Your Favourite Streamers</p>
          <div id='img-wrapper'>
            {favorites.map((streamer, idx) => (
              <Link key={idx} to={`/streamer/${streamer.twitterInfo.loginName}`}>
                <img key={idx} src={streamer.twitchInfo.profilePicture} className='streamer-propic-favourite' />
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

export default FavouriteStreamers;