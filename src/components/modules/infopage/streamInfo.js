import React from 'react';
import {Link} from 'react-router-dom';


const StreamInfo = function({id, streamId, thumbnail, title, startedAt, gameName}) {

  //extract date and time from timestamp string
  const tIndex = startedAt.indexOf("T");
  const zIndex = startedAt.indexOf(".");
  const date = startedAt.substring(0, tIndex);
  const time = startedAt.substring(tIndex + 1, zIndex);

  console.log(`ID: ${id} - STREAMID: ${streamId}`)

  return (
    <Link to={`/streamer/${id}/stream/${streamId}`}>
      <div className='stream-info'>
        <img src={thumbnail} className='stream-thumbnail' /> 
        <p className='title' title={title}>{title}</p>
        <p className='views'>Starting Game: {gameName}</p>
        <p className='started-at'>{date} {time} UTC</p>
      </div>
    </Link> 
  );
}

export default StreamInfo;