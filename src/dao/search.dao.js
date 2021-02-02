import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function searchStreamer(query) {
  try {
    let resp = await axios.get(`${config.apiEndpoint}search?query=${query}&key=${config.apiSecret}`, {cancelToken: source.token});
    return resp.data;
  } catch (error) {
    throw error;
  }
}

function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const searchDao = {
  searchStreamer,
  cancelRequest
}

export {searchDao}