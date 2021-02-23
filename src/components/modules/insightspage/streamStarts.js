import Info from 'components/svg/info';
import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const getPath = (x, y, width, height) => {
  if(height !== 0){
    return  `
      M ${x} ${y + height}
      L ${x} ${y + 4}
      C ${x} ${y+2} ${x+2} ${y} ${x + 4} ${y}
      L ${x + width - 4} ${y}
      C ${x + width - 2} ${y} ${x + width} ${y+2} ${x + width} ${y+4}
      L ${x + width} ${y + height}
      `
  }

  return null;
  
};

const RoundedBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

function CustomTooltip({ payload, label, active }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip-daily-activity">
        <p className='tooltip-hour-no-bar'>{`${(payload[0].payload.hour < 10) ? '0' + payload[0].payload.hour : payload[0].payload.hour}:00`}</p>
      </div>
    );
  }

  return null;
}

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  if(value > 0){
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;
  }
  return null;
};

const hourTickFormatter = (item) => {
  return `${(item < 10) ? '0' + item : item}:00`;
}

const StreamStarts = function({dailyActivity, maxStreamStarts}) {

  console.log(maxStreamStarts);

  return (
    <div className='insight-graph-wrapper'>
      <p className='insight-graph-title'>
        Stream Starts Times
      </p>
      <div className='insight-info'>
        <div className='insight-info-icon'>
          <Info />
        </div>
        <div className='insight-tooltip'>
          This chart represents the most common stream starting hours
        </div>
      </div>
      <div className='chart-wrapper'>
        <BarChart width={500} height={300} data={dailyActivity}>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#e9e1fa" strokeDasharray="15 5" />
          <Bar dataKey="streamStarts" barSize={20} fill="#5A3E85" label={renderCustomBarLabel} shape={<RoundedBar />}/>
          <XAxis dataKey="hour" minTickGap={2} tickFormatter={hourTickFormatter}/>
          <YAxis type='number' domain={[0, maxStreamStarts.streamStarts + 5]} dataKey="streamStarts" />
        </BarChart>
      </div>
      <div className='extra-info no-sleep-bar'>
        <p className='peak-starts'>
          The most common starting hour is: <i>{`${(maxStreamStarts.hour < 10) ? '0' + maxStreamStarts.hour : maxStreamStarts.hour}:00`} UTC</i> 
        </p>
      </div>
    </div>
  );
}

export default StreamStarts;