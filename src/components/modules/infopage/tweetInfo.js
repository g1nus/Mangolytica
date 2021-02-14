import React from 'react';

import Likes from 'components/svg/likes';
import Retweets from 'components/svg/retweets';

const TweetInfo = function({date, text, likes = 100, retweets= 100}) {

  return (
    <div className='tweet-info'>
      <p className='text'>{text}</p>
      <div className='extra-info'>
        <p className='date'>{date} UTC</p>
        <div className='l-r-info'>
          <span className='likes'><Likes /> </span> 200
          <span className='retweets'><Retweets /> </span> 200
        </div>
      </div>
    </div>
  );
}

export default TweetInfo;