import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {streamDao} from 'dao/stream.dao';
import {emotesDao} from 'dao/emotes.dao';

const StreamPage = function() {

  let { streamerId, streamId } = useParams();
  const isMounted = useRef(true);

  const [streamResult, setStreamResult] = useState([]);
  const [emotes, setEmotes] = useState({});

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await streamDao.getStreamEvents(streamerId, streamId);

        console.log(result);
        
        const tunits = result.chatTunits;
        if(isMounted.current) setStreamResult(result.chatTunits);
        
        let queryString = [...new Set([].concat.apply([], tunits.map(x => x.topWords.map(word => word.word))))].join();
        console.log(queryString)
        const foundEmotes = await emotesDao.getEmotes(streamerId, queryString);

        console.log(foundEmotes);

        if(isMounted.current) setEmotes(foundEmotes);
        

      }catch (err){
        console.log(err);
        if(isMounted.current) setStreamResult([{error: `failed`}]);
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
      stream page: {streamId}
      <p></p>
      <div>
        {
          (streamResult.length === 0) ? <> </> :
          <>
            <p>-----------------------</p>
            {streamResult.map((unit, index) => {
              return(
                <div key={index}>
                  {unit.topWords.map((word, indey) => {
                    return <div key={index + indey}>
                      <p> {(emotes[word.word]) ?  <img src={emotes[word.word]} alt={word.word} height="100"/>  : <></>} </p>
                      <p> {word.word} ({word.count}) </p>
                    </div>
                  })}
                <p>-----------------------[{unit.createdAt}]</p>
                </div>
              );
            })}
          </>
        }
      </div>
    </>
  );
}

export default StreamPage;