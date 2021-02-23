import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {streamDao} from 'dao/stream.dao';
import StreamViewersGraph from 'components/modules/streamPage/streamViewersGraph';
import StreamInfoBig from 'components/modules/streamPage/streamInfoBig';
import LoadingText from 'components/modules/loadingText';
import StreamSubscriptionsGraph from 'components/modules/streamPage/streamSubsciptionsGraph';

const StreamPage = function() {

  let { streamerId, streamId } = useParams();
  const isMounted = useRef(true);

  const [events, setEvents] = useState(undefined);
  const [streamResult, setStreamResult] = useState(undefined);

  useEffect(() => {
    const fetchData = async () =>{
      try{

        let result = await streamDao.getStream(streamerId, streamId)
        if(isMounted.current) setStreamResult(result);
        
      }catch (err){
        console.log(err);
        if(isMounted.current) setEvents([{error: `failed`}]);
      }

    }
    console.log(`mounted`)
    fetchData();
    return () => {
      isMounted.current = false;
    }
  }, [streamId, streamerId])

  console.log(`render!`);

  return (
    <>
      <div>
        {
          (!streamResult && !events) ?
            <LoadingText />
          :
          <div className='main-stream-info-wrapper'>
            <StreamInfoBig streamInfo={streamResult.stream} />
            <p className='mango-score'>
              Mango score: <span id='score'>{streamResult.score}</span>
            </p>
            <StreamViewersGraph {...{streamTunits: streamResult.stream.tunits, streamEvents: streamResult.streamEvents, msDuration: streamResult.stream.msDuration, streamerId}} />
            <div className='extra-stream-info'>
              <StreamSubscriptionsGraph subPerHour={streamResult.streamEvents.subPerHour} />
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default StreamPage;