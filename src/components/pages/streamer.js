import React, {useRef, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {streamDao} from 'dao/stream.dao';

const StreamerPage = function() {

  let { id } = useParams();
  const isMounted = useRef(true);

  const [streamResults, setStreamResults] = useState(undefined);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await streamDao.getStreamsByStreamerId(id);

        console.log(result);

        if(isMounted.current) setStreamResults(result.streams);

      }catch (err){
        console.log(err);
        if(isMounted.current) setStreamResults([{error: `failed`}]);
      }

    }
    console.log(`mounted`);
    fetchData();
    return () => {
      isMounted.current = false;
    }
  }, [id])

  console.log(`render!`);
  return (
    <>
      streamer page: {id}
      <div>
      {
       (!streamResults) ? 
        <p>loading</p>
      : 
        ((streamResults.length === 0) ? 
          <p id='no-mango-match'>no streams yet</p> 
        : 
          <div>
            {
              streamResults.map((result, index) => 
                <p key={index}> {result.streamId} | <i>{result.title}</i> </p>
              )
            }
        </div>)
      }
      </div>
    </>
  );
}

export default StreamerPage;