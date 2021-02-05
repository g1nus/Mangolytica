import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function getStream(id) {
  try {
    console.log(`[DAO] searching the following id -> ${id}`);
    let resp = await axios.get(`${config.apiEndpoint}stats/stream?id=${id}&key=${config.apiSecret}`, {cancelToken: source.token});
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    throw error;
  }
}

function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const streamDao = {
  getStream,
  cancelRequest
}

export {streamDao}