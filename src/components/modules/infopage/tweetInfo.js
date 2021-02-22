import React from 'react';

import Likes from 'components/svg/likes';
import Retweets from 'components/svg/retweets';

const TweetInfo = function({date, text, like, retweet_count}) {

  return (
    <div className='tweet-info'>
      <p className='text'>{text}</p>
      <div className='extra-info'>
        <p className='date'>{date} UTC</p>
        <div className='l-r-info'>
          <span className='likes'><Likes /> </span> {like}
          <span className='retweets'><Retweets /> </span> {retweet_count}
        </div>
      </div>
    </div>
  );
}

export default TweetInfo;