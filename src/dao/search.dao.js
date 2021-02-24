import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function searchStreamerOnLine(query) {
  try {
    let resp = await axios.get(`${config.apiEndpoint}search?query=${query}`, {cancelToken: source.token});
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function submitUsers(twitchId, twitterId, twitchName) {
  try{
    let resp = await axios.post(`${config.apiEndpoint}monitor`, {twitterId, twitchId, twitchName});
    return resp.data;
  } catch (err) {
    throw err;
  }
}

function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const searchDao = {
  searchStreamerOnLine,

  submitUsers,

  cancelRequest
}

export {searchDao}