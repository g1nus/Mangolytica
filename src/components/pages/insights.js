import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const Insights = function(props) {

  let { id } = useParams();

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
    <>
      insights page for {id}
      <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="counts" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <XAxis dataKey="date" />
        <YAxis dataKey="counts" />
      </LineChart>
    </>
  );
}

export default Insights;