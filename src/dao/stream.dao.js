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
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function getStreamEvents(streamerId, streamId) {
  try {
    console.log(`[DAO] searching the events of stream id -> ${streamId}`);
    let resp = await axios.get(`${config.apiEndpoint}streamers/${streamerId}/streams/${streamId}/events?key=${config.apiSecret}`, {cancelToken: source.token});
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
  getStreamEvents,
  cancelRequest
}

export {streamDao}