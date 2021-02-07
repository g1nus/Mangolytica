import axios from 'axios';

import config from 'config';

const source = axios.CancelToken.source();

async function searchStreamerOnLine(query) {
  try {
    let resp = await axios.get(`${config.apiEndpoint}search?query=${query}&key=${config.apiSecret}`, {cancelToken: source.token});
    return resp.data;
  } catch (error) {
    throw error;
  }
}

async function searchStreamerOnMango(query) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({data:[
        {name: '_izio_caio', 
          img_url:'http://placekitten.com/400/400',
          twitch: {username: 'User_1', page: 'https://twitch.tv'}, twitter: {username: '@tweetlady', page: 'https://twitter.com'}, createdAt: new Date()},
        {name: 'ciccio pasticcio', 
          img_url: 'http://placekitten.com/200/200',
          twitch: {username: 'User_2', page: 'https://twitch.tv'}, twitter: {username: '@tweetguy', page: 'https://twitter.com'}, createdAt: new Date()}
      ]});
    }, 2000);
  });
}

function cancelRequest () {
  source.cancel(`[S]request cancelled`);
}

const searchDao = {
  searchStreamerOnLine,
  searchStreamerOnMango,
  cancelRequest
}

export {searchDao}