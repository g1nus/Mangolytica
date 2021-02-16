import Info from 'components/svg/info';
import React, {useState} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Insights = function({id}) {

  const [data, setData] = useState(
    [
      {
        "date": "00:00:00",
        "counts": 8
      },
      {
        "date": "01:00:00",
        "counts": 8
      },
      {
        "date": "02:00:00",
        "counts": 13
      },
      {
        "date": "03:00:00",
        "counts": 8
      },
      {
        "date": "04:00:00",
        "counts": 6
      },
      {
        "date": "05:00:00",
        "counts": 3
      },
      {
        "date": "06:00:00",
        "counts": 7
      },
      {
        "date": "07:00:00",
        "counts": 3
      },
      {
        "date": "08:00:00",
        "counts": 7
      },
      {
        "date": "09:00:00",
        "counts": 1
      },
      {
        "date": "10:00:00",
        "counts": 8
      },
      {
        "date": "11:00:00",
        "counts": 9
      },
      {
        "date": "12:00:00",
        "counts": 5
      },
      {
        "date": "13:00:00",
        "counts": 5
      },
      {
        "date": "14:00:00",
        "counts": 1
      },
      {
        "date": "15:00:00",
        "counts": 3
      },
      {
        "date": "16:00:00",
        "counts": 15
      },
      {
        "date": "17:00:00",
        "counts": 16
      },
      {
        "date": "18:00:00",
        "counts": 23
      },
      {
        "date": "19:00:00",
        "counts": 17
      },
      {
        "date": "20:00:00",
        "counts": 12
      },
      {
        "date": "21:00:00",
        "counts": 8
      },
      {
        "date": "22:00:00",
        "counts": 10
      },
      {
        "date": "23:00:00",
        "counts": 9
      }
    ]
  )

  return (
    <div id='insights-wrapper'>
      <p id='mango-score'>
        Mango score is: <span id='score'> 48 </span>
      </p>
      <div className='insight-graph-wrapper'>
        <p className='insight-graph-title'>
          Title of graph
        </p>
        <div className='insight-info'>
          <div className='insight-info-icon'>
            <Info />
          </div>
          <div className='insight-tooltip'>
            Basic info about what the stat should be
            Basic info about what the stat should be
            Basic info about what the stat should be
            Basic info about what the stat should be
          </div>
        </div>
        <div className='chart-wrapper'>
          <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="counts" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <XAxis dataKey="date" />
            <YAxis dataKey="counts" />
          </LineChart>
        </div>
      </div>

      <div className='insight-graph-wrapper'>
        <p className='insight-graph-title'>
          Title of graph
        </p>
        <div className='insight-info'>
          <div className='insight-info-icon'>
            <Info />
          </div>
          <div className='insight-tooltip'>
            Basic info about what the stat should be
            Basic info about what the stat should be
            Basic info about what the stat should be
            Basic info about what the stat should be
          </div>
        </div>
        <div className='chart-wrapper'>
          <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="counts" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <XAxis dataKey="date" />
            <YAxis dataKey="counts" />
          </LineChart>
        </div>
      </div>

      <div className='insight-graph-wrapper'>
        <p className='insight-graph-title'>
          Title of graph
        </p>
        <div className='insight-info'>
          <div className='insight-info-icon'>
            <Info />
          </div>
          <div className='insight-tooltip'>
            Basic info about what the stat should be
            Basic info about what the stat should be
            Basic info about what the stat should be
            Basic info about what the stat should be
          </div>
        </div>
        <div className='chart-wrapper'>
          <LineChart width={500} height={300} data={data}>
            <Line type="monotone" dataKey="counts" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <XAxis dataKey="date" />
            <YAxis dataKey="counts" />
          </LineChart>
        </div>
      </div>

    </div>
  );
}

export default Insights;