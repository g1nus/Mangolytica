import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ScatterChart, Scatter, Legend, ReferenceLine } from 'recharts';

import {streamDao} from 'dao/stream.dao';
import {emotesDao} from 'dao/emotes.dao';

function CustomTooltip({ payload, label, active }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className='tooltip-title'>{`${payload[0].payload.title}`}</p>
        <div className='custom-tooltip-extra-info'>
          <span className='tooltip-time'>{`${payload[0].payload.createdAt}`}</span>
          <span className='tooltip-game'>{`${payload[0].payload.gameName}`}</span>
        </div>
      </div>
    );
  }

  return null;
}

const customTickFormatter = (item) => {
  let time = new Date(item);
  let hours = (time.getHours() === 0) ? 23 : time.getHours() - 1;
  let minutes = time.getMinutes();
  console.log(minutes);
  if(minutes < 10) minutes='0'+minutes;

  return `${hours}:${minutes}`;
}

export function ReferenceLabel({label, viewBox}) {;
  return (
    <foreignObject x={viewBox.x + 1} y={230} width={70 + ((label.user.length > 8) ? (label.user.length - 8) * 2.8 : 0)} height="30">
      <div className='raid-label' xmlns="http://www.w3.org/1999/xhtml">
        <p xmlns="http://www.w3.org/1999/xhtml">
          {label.user}
        </p>
        <p className='raid-hour' xmlns="http://www.w3.org/1999/xhtml">
          {label.createdAt}
        </p>
      </div>
    </foreignObject>
  )
}

const StreamPage = function() {

  let { streamerId, streamId } = useParams();
  const isMounted = useRef(true);

  const [events, setEvents] = useState(undefined);
  const [emotes, setEmotes] = useState({});
  const [stream, setStream] = useState(undefined);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        let result = await streamDao.getStreamEvents(streamerId, streamId);

        result.raids = result.raids.map((raid) => ({...raid, ms: new Date(raid.createdAt).getTime(), UTC: raid.createdAt, createdAt: raid.createdAt.substring(raid.createdAt.indexOf("T") + 1, raid.createdAt.indexOf("."))}))
        result.chatTunits = result.chatTunits.map((chatTunit) => ({...chatTunit, ms: new Date(chatTunit.createdAt).getTime()}));

        console.log(result);

        let streamResult = await streamDao.getStream(streamerId, streamId)

        streamResult.tunits = streamResult.tunits.map((tunit) => ({...tunit, ms: new Date(tunit.createdAt).getTime(), UTC: tunit.createdAt, createdAt: tunit.createdAt.substring(tunit.createdAt.indexOf("T") + 1, tunit.createdAt.indexOf("."))}))
        streamResult.length = streamResult.tunits[streamResult.tunits.length - 1].ms - streamResult.tunits[0].ms;

        console.log(streamResult);
        if(isMounted.current) setStream(streamResult);
        
        const tunits = result.chatTunits;
        if(isMounted.current) setEvents(result);
        
        let queryString = [...new Set([].concat.apply([], tunits.map(x => x.topWords.map(word => word.word))))].join();
        console.log(queryString)
        const foundEmotes = await emotesDao.getEmotes(streamerId, queryString);

        console.log(foundEmotes);

        if(isMounted.current) setEmotes(foundEmotes);
        

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
      stream page: {streamId}
      <p></p>
      <div className='graph'>
        {
          (!stream && !events) ?
            <>loading...</>
          :
          <LineChart width={900} height={300} data={stream.tunits}>
            <Line type="monotone" dataKey="viewers" stroke="#5A3E85" dot={{strokeWidth: 1, r: 2}}/>
            <CartesianGrid stroke="#ccc" />
            <Tooltip content={<CustomTooltip />}/>
            <XAxis width={100} dataKey="ms" type='number' domain={[stream.tunits[0].ms, stream.tunits[stream.tunits.length - 1].ms]} 
              interval='preserveStartEnd'
              tickCount={10}
              minTickGap={20}
              tickFormatter={customTickFormatter}> 
            </XAxis>
            {events?.raids?.map((raid, index) => {
              return <ReferenceLine key={index} x={raid.ms} stroke="#cb3cff" strokeDasharray='3 3' label={<ReferenceLabel label={{createdAt: raid.createdAt, user: raid.user}}/>} />
            })}
            <YAxis dataKey="viewers" />
          </LineChart>
        }
      </div>

      <div className='chat-analysis'>
        <div className='chat-bar'>
          {
            events?.chatTunits?.map((chatTunit, idx) => {
              let length = 0;
              if(idx === 0){
                length = (chatTunit.ms - stream?.tunits[0].ms) / stream?.length;
              }else{
                length = (chatTunit.ms - events?.chatTunits[idx-1].ms) / stream?.length;
              }
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
                      chatTunit?.topWords.map((word, idy) => {
                        return (
                          <div className='word-info' key={idx + idy}>
                          <p className='word'> {(emotes[word.word]) ?  <img src={emotes[word.word]} alt={word.word} height="33"/>  : <>{word.word}</>} </p>
                          <p className='word-count'> ({word.count}) </p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default StreamPage;