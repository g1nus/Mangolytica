import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();


async function fetchFavorites(userToken){
  try {
    let resp = await axios.get(`${config.apiEndpoint}favorites?g_token=${userToken}`, {cancelToken: source.token});
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function submitFavoriteFake(userToken, streamerId, twitterId) {
  try{
    let resp = await axios.post(`${config.apiEndpoint}favorites`, {g_token: userToken, twitchId: streamerId, twitterId});
    return resp.data;
  } catch (err) {
    throw err;
  }
}


function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const favoritesDao = {

  fetchFavorites,
  submitFavoriteFake,

  cancelRequest
}

export {favoritesDao}