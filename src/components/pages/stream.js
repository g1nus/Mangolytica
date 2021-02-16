import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ScatterChart, Scatter, Legend, ReferenceLine } from 'recharts';

import {streamDao} from 'dao/stream.dao';
import {emotesDao} from 'dao/emotes.dao';

function CustomTooltip({ payload, label, active }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip" style={{backgroundColor: 'white', width: '180px', fontSize: '10px'}}>
        <p className="label">{`${payload[0].payload.createdAt}`}<br/>{`${payload[0].payload.title}`}<br/>{`${payload[0].payload.gameName}`}</p>
      </div>
    );
  }

  return null;
}

const renderCustomAxisTick = ({ x, y, payload, dx, dy }) => {

  let time = new Date(payload.value);
  let hours = (time.getHours() === 0) ? 23 : time.getHours() - 1;
  let minutes = time.getMinutes();
  if(minutes === '0') minutes+='0'


  return (
    <text x={x} y={y + 20} fill="#666" textAnchor="middle" dx={dx} dy={dy}>{`${hours}:${minutes}`}</text>
  );
};

export function ReferenceLabel({label, viewBox}) {;
  return (
      <text 
          x={viewBox.x} y={260}
          fontSize={10} >
          {label.user}
      </text>
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
            <Line type="monotone" dataKey="viewers" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <Tooltip content={<CustomTooltip />}/>
            <XAxis dataKey="ms" tick={false/*renderCustomAxisTick*/}> 
              <Label value="Time" offset={0} position="insideBottom" />
            </XAxis>
            {events?.raids?.map((raid, index) => {
              return <ReferenceLine key={index} x={stream.tunits.find(tunit => parseInt(tunit.ms, 10) > raid.ms).ms} stroke="red" label={<ReferenceLabel label={{createdAt: raid.createdAt, user: raid.user}}/>} />
            })}
            <YAxis dataKey="viewers" />
          </LineChart>
        }
      </div>

      <div className='chat-analysis'>
        {stream?.length}
        <div className='chat-bar' style={{width: 800 + 'px',height: 20 + 'px', backgroundColor: 'grey'}}>
          {
            events?.chatTunits?.map((chatTunit, idx) => {
              let length = 0;
              if(idx === 0){
                length = (chatTunit.ms - stream?.tunits[0].ms) / stream?.length * 100;
              }else{
                length = (chatTunit.ms - events?.chatTunits[idx-1].ms) / stream?.length * 100;
              }
              return(
                <div className='tunit' key={idx} style={{position: 'relative', display: 'inline-block', height:'100%', width: length + '%', border: 'solid 1px white'}}>
                  <div className='tunit-msgs' style={{position:'absolute', top: '25px', left: '0px', width: '30px', height:'160px', backgroundColor:'aliceblue'}}>
                    {
                      chatTunit?.topWords.map((word, idy) => {
                        return (
                          <div key={idx + idy}>
                          <p style={{margin: '0px'}}> {(emotes[word.word]) ?  <img src={emotes[word.word]} alt={word.word} height="25"/>  : <>{word.word}</>} </p>
                          <p style={{margin: '0px', fontSize:'8px'}}> ({word.count}) </p>
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