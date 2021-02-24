import React from 'react';

const StreamInfoBig = function ({streamInfo}) {

  const tIndex = streamInfo.startedAt.indexOf("T");
  const zIndex = streamInfo.startedAt.indexOf(".");
  const date = streamInfo.startedAt.substring(0, tIndex);
  const time = streamInfo.startedAt.substring(tIndex + 1, zIndex);

  return (
    <div className='main-stream-info'>
      <div className='stream-thumbnail-big'>
        <img src={streamInfo.thumbnail} className='stream-thumbnail-big' />
        <div className='timestamp'>{streamInfo.duration.substring(0, streamInfo.duration.indexOf('.'))}</div>
      </div>
      <p className='stream-title' title={streamInfo.title}>{streamInfo.title}</p>
      <div className='stream-details'>
        <p className='stream-views'>Average Viewers: <i>{streamInfo.averageViewers}</i></p>
        <p className='stream-views'>New Followers: <i>{streamInfo.totalNewFollowers}</i></p>
        <p className='stream-started-at'>Started At: <i>{date} {time}</i> UTC</p>
      </div>
    </div>
  )
}

export default StreamInfoBig;