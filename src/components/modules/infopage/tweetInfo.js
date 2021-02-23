import React from 'react';

import Likes from 'components/svg/likes';
import Retweets from 'components/svg/retweets';

const TweetInfo = function({date, text, like, retweet_count}) {

  return (
    <div className='tweet-info'>
      <p className='text'>{
        text.split(/\n| /).map((word, idx) => {
          let className= '';
          
          if(word[0] === '@'){
            className = 'user-tag';
          }
          if(word[0] === '#'){
            className = 'hash-tag';
          }
          if(word.startsWith('https://') || word.startsWith('http://')){
            className = 'link';
          }

          return <span key={idx} className={className}>{word} </span>
        })
      }</p>
      <div className='extra-info'>
        <p className='date'>{date} UTC</p>
        <div className='l-r-info'>
          <div className='likes-wrapper'>
            <span className='likes'><Likes /> </span> {like}
          </div>
          <div className='retweet-wrapper'>
            {retweet_count} <span className='retweets'><Retweets /> </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetInfo;