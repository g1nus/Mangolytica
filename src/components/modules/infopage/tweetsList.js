import React from 'react';

import TweetInfo from 'components/modules/infopage/tweetInfo';

const TweetsList = function({tweets}) {


  return (
    <div id='tweets-list'>
      <p id='tweets-list-title'>
        Past tweets
      </p>
      {(tweets.length === 0) ? 
        <p id='no-tweet-match'>no tweets :(</p> 
      :
        <>
        {
          tweets.map((result, index) => (
            <div key={index}>
              <TweetInfo {...result} />
            </div>
          ))
        }
        </>
      }
    </div>
  );
}

export default TweetsList;