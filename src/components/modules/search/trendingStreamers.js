import React from 'react';

const TrendingStreamers = function(props) {
  return (
    <div id='trending-streamers'>
      <p>Trending Streamers</p>
      <div id='img-wrapper'>
        <img src='http://placekitten.com/200/200' className='streamer-propic-trending' />
        <img src='http://placekitten.com/300/300' className='streamer-propic-trending' />
        <img src='http://placekitten.com/400/400' className='streamer-propic-trending' />
        <img src='http://placekitten.com/100/100' className='streamer-propic-trending' />
        <img src='http://placekitten.com/1000/1000' className='streamer-propic-trending' />
      </div>
      
    </div>
  );
}

export default TrendingStreamers;