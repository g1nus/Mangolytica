import Info from 'components/svg/info';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function CustomTooltip({ payload, label, active }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip-daily-activity">
        <p className='tooltip-hour'>{`${(payload[0].payload.hour < 10) ? '0' + payload[0].payload.hour : payload[0].payload.hour}:00`}</p>
        <div className='custom-tooltip-extra-daily-info'>
          <span className='stream-viewers'>Stream Viewers: {`${payload[0].payload.streamViewers}`}</span>
          <span className='tweet-counts'>Tweet Activity: {`${payload[0].payload.tweetCounts}`}</span>
        </div>
      </div>
    );
  }

  return null;
}

const hourTickFormatter = (item) => {
  return `${(item < 10) ? '0' + item : item}:00`;
}

const HourlyActivity = function({dailyActivity, dailyTweetPeak, dailyAverageViewers, sleep}) {

  return (
    <div className='insight-graph-wrapper'>
      <p className='insight-graph-title'>
        Daily Activity
      </p>
      <div className='insight-info'>
        <div className='insight-info-icon'>
          <Info />
        </div>
        <div className='insight-tooltip'>
          This chart represents the daily average activity of the streamer both on Twitch and Twitter, hour by hour
        </div>
      </div>
      <div className='chart-wrapper'>
        <LineChart width={500} height={300} data={dailyActivity}>
          <CartesianGrid stroke="#e9e1fa" strokeDasharray="15 5" />
          <Line type="monotone" dataKey="streamViewers" stroke="#5A3E85" dot={{strokeWidth: 1, r: 2}}/>
          {
            (dailyActivity[0].enhancedTweetActivity) ?
              <Line type="monotone" dataKey="enhancedTweetActivity" stroke="#55acee" dot={{strokeWidth: 1, r: 2}}/>
            :
              <Line type="monotone" dataKey="tweetCounts" stroke="#55acee" dot={{strokeWidth: 1, r: 2}}/>
          }
          <Tooltip content={<CustomTooltip />} />
          <XAxis dataKey="hour" minTickGap={2} tickFormatter={hourTickFormatter}/>
          <YAxis dataKey="streamViewers" />
        </LineChart>
      </div>
      <div className='extra-info'>
        <div className='sleep-bar' title='sleeping hours'>
          {
            (sleep.totalSleep < 4 || sleep.totalSleep > 12) ?
              <p className='never-sleep'><i>I'm the streamer who never sleeps...</i></p>
            :
              <>
                {
                  dailyActivity.map((hour, idx) => (
                    <div key={idx}>
                      {(hour.sleeping) ? <div className='sleep-hour' style={{left: (18.3 * (hour.hour)) + 'px'}}></div> : <></>}
                    </div>
                  ))
                }
              </>
          }
        </div>
        <p className='average-viewers'>
          Average Hourly Viewers: <i>{dailyAverageViewers}</i>
        </p>
        <p className='average-tweets'>
          Maximum Hourly Tweets: <i>{dailyTweetPeak}</i>
        </p>
        <p className='sleep-info'>
          Sleeping hours: {(sleep.totalSleep < 4 || sleep.totalSleep > 12) ? <i>this person never sleeps!</i> : <i>{sleep.start}—{sleep.end}</i>} 
        </p>
      </div>
    </div>
  );
}

export default HourlyActivity;