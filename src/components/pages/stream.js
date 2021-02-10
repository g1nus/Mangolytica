import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {streamDao} from 'dao/stream.dao';
import {emotesDao} from 'dao/emotes.dao';

const StreamPage = function() {

  let { id } = useParams();
  const isMounted = useRef(true);

  const [streamResult, setStreamResult] = useState([]);
  const [emotes, setEmotes] = useState({});

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await streamDao.getStream(id);
        const tunits = result.events.data.chatTunits;
        if(isMounted.current) setStreamResult(result.events.data.chatTunits);
        
        let queryString = [...new Set([].concat.apply([], tunits.map(x => x.topWords.map(word => word.word))))].join();
        console.log(queryString)
        const foundEmotes = await emotesDao.getEmotes(result.streamerId, queryString);

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
  }, [id])

  console.log(`render!`);

  return (
    <>
      stream page: {id}
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
                      <p> {(emotes[word.word]) ?  <img src={emotes[word.word]} alt={word.word} width="100" height="100"/>  : <></>} </p>
                      <p> {word.word} ({word.count}) </p>
                    </div>
                  })}
                <p>-----------------------</p>
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