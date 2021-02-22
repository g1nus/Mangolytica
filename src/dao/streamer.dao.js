import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function fetchTrending() {
  try {
    let resp = await axios.get(`${config.apiEndpoint}trending`, {cancelToken: source.token});
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function getStreamerInfo(id) {
  try {
    console.log(`[DAO] searching the streams of the following streamer id -> ${id}`);
    let resp = await axios.get(`${config.apiEndpoint}users/${id}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
}

const streamerDao = {
  fetchTrending,
  getStreamerInfo
}

export {streamerDao}