import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();


async function fetchFavoritesFake(userToken){
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve([
        {
          profile_image: "http://placekitten.com/200/200"
        },
        {
          profile_image: "http://placekitten.com/300/300"
        },
        {
          profile_image: "http://placekitten.com/400/400"
        },
        {
          profile_image: "http://placekitten.com/1000/1000"
        }
      ]);
    }, 1000);
  });
}

async function submitFavoriteFake(userToken, streamerId) {
  console.log(userToken);
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({msg: 'ok'});
    }, 1000);
  });
}


function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const favoritesDao = {

  fetchFavoritesFake,
  submitFavoriteFake,

  cancelRequest
}

export {favoritesDao}