import React, {useRef, useEffect, useState, useContext} from 'react';

import {AppContext} from 'components/providers/appProvider';
import {favoritesDao} from 'dao/favorites.dao';

const FavouriteStreamers = function(props) {

  const [favorites, setFavorites] = useState(undefined);

  //reference and mount cycle handler
  const isMounted = useRef(true);

  //get data from global context
  const appConsumer = useContext(AppContext);

  useEffect(() => {

    const fetchData = async () => {
      try{
        let favoriteStreamers = await favoritesDao.fetchFavoritesFake();
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
            {favorites.map((streamer, idx) => <img key={idx} src={streamer.profile_image} className='streamer-propic-favourite' />)}
          </div>
        </>
      :
        <></>
      }
    </div>
  );
}

export default FavouriteStreamers;