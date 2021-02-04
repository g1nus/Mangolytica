import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function getEmotes(id, emotes) {
  try {
    let resp = await axios.get(`${config.apiEndpoint}emotes?id=${id}&emotes=${emotes}&key=${config.apiSecret}`, {cancelToken: source.token});
    return resp.data;
  } catch (error) {
    throw error;
  }
}

function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const emotesDao = {
  getEmotes,
  cancelRequest
}

export {emotesDao}