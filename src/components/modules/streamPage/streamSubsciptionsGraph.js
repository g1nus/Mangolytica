import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import Info from 'components/svg/info';

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
        <p className='tooltip-hour-no-bar'>{payload[0].payload.hour.substring(0,5)}</p>
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
  return item.substring(0,5);
}
const StreamSubscriptionsGraph = function ({subPerHour}) {
  return (
    <div className='insight-graph-wrapper'>
      <p className='insight-graph-title'>
        Subscriptions per Hour
      </p>
      <div className='insight-info sub-info'>
        <div className='insight-info-icon'>
          <Info />
        </div>
        <div className='insight-tooltip'>
          Cumulative subscriptions of every hour of stream
        </div>
      </div>
      <div className='chart-wrapper'>
        <BarChart width={500} height={300} data={subPerHour}>
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#e9e1fa" strokeDasharray="15 5" />
          <Bar dataKey="sub" barSize={30} fill="#5A3E85" label={renderCustomBarLabel} shape={<RoundedBar />}/>
          <XAxis dataKey="hour" minTickGap={2} tickFormatter={hourTickFormatter}/>
          <YAxis type='number' domain={[0, Math.max(...subPerHour.map((s) => s.sub)) + 20]} dataKey="sub" />
        </BarChart>
      </div>
      
    </div>
  )
}

export default StreamSubscriptionsGraph;