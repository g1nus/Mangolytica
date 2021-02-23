import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label, ScatterChart, Scatter, Legend, ReferenceLine } from 'recharts';

import Info from 'components/svg/info';
import ChatBar from './chatBar';
import GameBar from './gameBar';

function CustomTooltip({ payload, label, active }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className='tooltip-title'>{`${payload[0].payload.title}`}</p>
        <div className='custom-tooltip-extra-info'>
          <span className='tooltip-time'>{`${payload[0].payload.createdAt.substring(payload[0].payload.createdAt.indexOf('T') + 1, payload[0].payload.createdAt.indexOf('.'))}`}</span>
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
  if(minutes < 10) minutes='0'+minutes;
  if(hours < 10) hours = '0'+hours;

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
          {label.createdAt.substring(label.createdAt.indexOf('T') + 1, label.createdAt.indexOf('.'))}
        </p>
      </div>
    </foreignObject>
  )
}

const StreamViewersGraph = function ({streamTunits, streamEvents, msDuration, streamerId, viewersPerGame}) {

  return (
    <div className='main-chart-wrapper'>
      <p className='chart-title'>
        Stream Viewers and Events
      </p>
      <div className='insight-info-viewers'>
        <div className='insight-info-viewers-icon'>
          <Info />
        </div>
        <div className='insight-tooltip'>
          This chart represents the viewers of the stream over its duration. Additinally, you can check the raids, the most common words in chat and the different games played. Hover over the chart and the bars to see more details
        </div>
      </div>
      <LineChart width={900} height={300} data={streamTunits}>
        <Line type="monotone" dataKey="viewers" stroke="#5A3E85" dot={{strokeWidth: 1, r: 2}}/>
        <CartesianGrid stroke="#ccc" />
        <Tooltip content={<CustomTooltip />}/>
        <XAxis width={100} dataKey="msTimeStamp" type='number' domain={[streamTunits[0].msTimeStamp, streamTunits[streamTunits.length - 1].msTimeStamp]} 
          interval='preserveStartEnd'
          tickCount={10}
          minTickGap={20}
          tickFormatter={customTickFormatter}> 
        </XAxis>
        {streamEvents.raids.map((raid, index) => {
          return <ReferenceLine key={index} x={raid.msTimeStamp} stroke="#cb3cff" strokeDasharray='3 3' label={<ReferenceLabel label={{createdAt: raid.createdAt, user: raid.user}}/>} />
        })}
        <YAxis dataKey="viewers" />
      </LineChart>

      <ChatBar chatTunits={streamEvents.chatTunits} streamLength={msDuration} streamerId={streamerId} />
      <GameBar gameTunits={streamEvents.gameTunits} streamLength={msDuration} viewersPerGame={viewersPerGame}/>
    </div>
  )
}

export default StreamViewersGraph;