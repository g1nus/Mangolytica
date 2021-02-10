import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function getStream(id) {
  try {
    console.log(`[DAO] searching the following id -> ${id}`);
    let resp = await axios.get(`${config.apiEndpoint}streams/${id}?key=${config.apiSecret}`, {cancelToken: source.token});
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function getStreamsByStreamerId(id) {
  try {
    console.log(`[DAO] searching the streams of the following streamer id -> ${id}`);
    let resp = await axios.get(`${config.apiEndpoint}streamers/${id}?key=${config.apiSecret}`, {cancelToken: source.token});
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
  getStreamsByStreamerId,
  cancelRequest
}

export {streamDao}