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
    let resp = await axios.get(`${config.apiEndpoint}users/${id}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function getStreamerInsights(id) {
  try {
    let resp = await axios.get(`${config.apiEndpoint}users/${id}/insights`);
    return resp.data;
  } catch (error) {
    throw error;
  }
}

const streamerDao = {
  fetchTrending,
  getStreamerInfo,
  getStreamerInsights
}

export {streamerDao}