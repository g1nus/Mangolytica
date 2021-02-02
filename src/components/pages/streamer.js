import React from 'react';
import {useParams} from 'react-router-dom';

const StreamerPage = function() {

  let { id } = useParams();

  return (
    <>
      streamer page: {id}
    </>
  );
}

export default StreamerPage;