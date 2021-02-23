import React, {useState, useEffect, useRef} from 'react';

import {streamerDao} from 'dao/streamer.dao';
import {emotesDao} from 'dao/emotes.dao';

const ChatBar = function ({chatTunits, streamLength, streamerId}) {

  const [emotes, setEmotes] = useState({});

  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () =>{
      try{

        let streamerInfo = await streamerDao.getStreamerInfo(streamerId)

        console.log(streamerInfo);
                
        let queryString = [...new Set([].concat.apply([], chatTunits.map(x => x.topWords.map(word => word.word))))].join();
        console.log(queryString)
        const foundEmotes = await emotesDao.getEmotes(streamerInfo.twitchInfo.streamerId, queryString);


        if(isMounted.current) setEmotes(foundEmotes);
        
      }catch (err){
        console.log(err);
        if(isMounted.current) setEmotes([{error: `failed`}]);
      }

    }
    fetchData();
    return () => {
      isMounted.current = false;
    }
  }, [])
  
  return (
    <div className='chat-analysis'>
      <div className='chat-bar'>
        {
          chatTunits.map((chatTunit, idx) => {
            
            let length = chatTunit.msTunitLenght / streamLength;

            let rgb = [0, 0, 184];
            let maxWord = chatTunit.topWords[0].count;
            if(maxWord > 3000){
              rgb[0] = (1 - length) * 255;
            }else if(maxWord > 1000){
              rgb[0] = (1 - length) * 200;
            }else{
              rgb[0] = (1 - length) * 155;
            }
            return(
              <div className='tunit' key={idx} style={{width: (length * 100) + '%'}}>
                <div className='tunit-color' style={{backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`}}>
                </div>
                <div className='tunit-msgs' style={{backgroundColor: `rgb(${255 - (rgb[0]/255*50)}, ${255}, ${255})`}}>
                  {
                    (emotes) ? 
                    <>
                      {chatTunit.topWords.map((word, idy) => {
                        return (
                          <div className='word-info' key={idx + idy}>
                          <p className='word'> {(emotes[word.word]) ?  <img src={emotes[word.word]} alt={word.word} height="33"/>  : <>{word.word}</>} </p>
                          <p className='word-count'> ({word.count}) </p>
                          </div>
                        )
                      })}
                    </>
                    :
                    <>
                      {chatTunit.topWords.map((word, idy) => {
                        return (
                          <div className='word-info' key={idx + idy}>
                          <p className='word'>{word.word} </p>
                          <p className='word-count'> ({word.count}) </p>
                          </div>
                        )
                      })}
                    </>
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChatBar;