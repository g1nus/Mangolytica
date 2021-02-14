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

async function searchTwitterFake(query){
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve([
        {
          user_name: "Esfand",
          user_screen: "EsfandTV",
          description: "Variety, IRL, and WoW streamer. I stream pretty much everything. Founder of @OTKNetwork",
          verified: true,
          followers_count: 179219,
          profile_image: "http://pbs.twimg.com/profile_images/1059285196720103424/ZQdtHCOo_normal.jpg"
        },
        {
          user_name: "OTK",
          user_screen: "OTKnetwork",
          description: "One True King Organization | #OTKALLDAY 👑\n\nOwned by:\n@asmongold\n@realmizkif\n@esfandtv\n@richwcampbell\n@tipsoutbaby\n@nmplol\n\nInquiries: partners@otknetwork.com",
          verified: false,
          followers_count: 144203,
          profile_image: "http://pbs.twimg.com/profile_images/1334727259505233921/KE0T5qVJ_normal.jpg"
        }
      ]);
    }, 1000);
  });
}

async function submitUsersFake(twitchStreamer, twitterUser) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve({msg: 'ok'});
    }, 1000);
  });
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

  searchTwitterFake,
  submitUsersFake,

  searchStreamerOnMango,
  cancelRequest
}

export {searchDao}