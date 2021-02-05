import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {streamDao} from 'dao/stream.dao';
import {emotesDao} from 'dao/emotes.dao';

const StreamPage = function() {

  let { id } = useParams();
  const isMounted = useRef(true);

  const [streamResult, setStreamResult] = useState([]);
  const [emotes, setEmotes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        let emotes = {};
        const result = await streamDao.getStream(id);
        const tunits = result.events.data.chatTunits;
        if(isMounted.current) setStreamResult(result.events.data.chatTunits);

        for(let i = 0; i < tunits.length; i++){
          const wordsCode = tunits[i].topWords.reduce((word, string) => ({word: word.word + "," + string.word}));
          const foundEmotes = await emotesDao.getEmotes(result.streamerId, wordsCode.word);
          tunits[i].topWords.forEach(word => {
            if(!emotes[word.word] && foundEmotes[word.word]){
              emotes[word.word] = foundEmotes[word.word];
            }
          });
        }
        console.log(emotes);

        if(isMounted.current) setEmotes(emotes);

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
                    return <>
                      <p> {(emotes[word.word]) ?  <img src={emotes[word.word]} alt={word.word} width="100" height="100"/>  : <></>} </p>
                      <p key={indey + index}> {word.word} ({word.count}) </p>
                    </>
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