import Info from 'components/svg/info';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts';

function CustomTooltip({ payload, label, active }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip-date-activity">
        <p className='tooltip-date'>{payload[0].payload.date}</p>
        <div className='custom-tooltip-extra-date-info'>
          <span className='stream-viewers'>Twitch Viewers: {`${payload[0].payload.viewers}`}</span>
          <span className='tweet-likes'>Twitter Likes: {`${payload[0].payload.likes}`}</span>
        </div>
      </div>
    );
  }

  return null;
}

const DateActivity = function({dateActivity, dateLikesPeak, dateViewersPeak, maximalPeak}) {

  console.log(dateActivity);

  return (
    <div className='insight-graph-wrapper'>
      <p className='insight-graph-title'>
        Twitch and Twitter Inolvement
      </p>
      <div className='insight-info'>
        <div className='insight-info-icon'>
          <Info />
        </div>
        <div className='insight-tooltip'>
          This chart represents the fans activity by date, both on Twitch and Twitter. The blue lines represent the days when the streamers tweets something about its stream
        </div>
      </div>
      <div className='chart-wrapper'>
        <LineChart width={500} height={300} data={dateActivity}>
          <defs>
          {dateActivity.map((day, index) => {
            return (day.twitchMention) ? 
              <linearGradient key={index} id={"grad" + index} x1="0" y1={300 - (day.viewers)/maximalPeak*261 - 39} x2="0" y2={300 - day.likes/maximalPeak*261 - 39} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor='#5A3E85' stopOpacity='0.0' />
                <stop offset="10%" stopColor='#5A3E85' stopOpacity='0.0' />
                <stop offset="50%" stopColor='#59579d' stopOpacity='1' />
                <stop offset="90%" stopColor='#55acee' stopOpacity='0.0' />
                <stop offset="100%" stopColor='#55acee' stopOpacity='0.0' />
              </linearGradient>
            : 
              <linearGradient key={index} id={"grad" + index} x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor='blue' stopOpacity='0.4' />
                <stop offset="50%" stopColor='red' stopOpacity='1' />
                <stop offset="100%" stopColor='yellow' stopOpacity='0.4' />
              </linearGradient>
          })}
          </defs>
          <CartesianGrid stroke="#e9e1fa" strokeDasharray="15 5" />
          {dateActivity.map((day, index) => {
            return (day.twitchMention) ? 
              <ReferenceLine key={index} segment={[{ x: day.date, y: day.viewers }, { x: day.date, y: day.likes }]} strokeWidth={1} stroke={'url(#grad'+index+')'} /> 
            : 
              <g key={index}></g> 
          })}
          <Line type="monotone" dataKey="viewers" stroke="#5A3E85" dot={{strokeWidth: 1, r: 2}}/>
          <Line type="monotone" dataKey="likes" stroke="#55acee" dot={{strokeWidth: 1, r: 2}}/>
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="date" minTickGap={2} />
          <YAxis type='number' domain={[0, maximalPeak]} dataKey={(dateViewersPeak.viewers > dateLikesPeak.likes) ? "viewers" : "likes"} />
        </LineChart>
      </div>
      <div className='extra-info no-sleep-bar'>
        <p className='peak-viewers'>
          Viewers Peak Day: <i>{dateViewersPeak.viewers}</i> | <i>{dateViewersPeak.date}</i> 
        </p>
        <p className='peak-likes'>
          Likes Peak Day: <i>{dateLikesPeak.likes}</i> | <i>{dateLikesPeak.date}</i>
        </p>
      </div>
    </div>
  );
}

export default DateActivity;