import React, {useRef, useEffect, useState} from 'react';
import {Link, Switch, Route, useParams} from 'react-router-dom';

import {streamDao} from 'dao/stream.dao';
import StreamerInfo from 'components/modules/infopage/streamerInfo';
import StreamsList from 'components/modules/infopage/streamsList';
import TweetsList from 'components/modules/infopage/tweetsList';
import Insights from './insights';

const InfoPage = function() {

  let { id } = useParams();
  const isMounted = useRef(true);

  const [streamerData, setStreamerData] = useState(undefined);
  const [tweetsData, setTweetsData]  = useState(
    [
      {
        date: "2021-02-14 10:31:47",
        text: "Do you guys think we’ll ever go back to “normal,” or is it just going to be before, during, and after corona?”"
      },
      {
        date: "2021-02-14 09:08:09",
        text: "we'll be on Mizkif's stream for OTK valentine's show tomorrow and then I will play Super Seducer 3 after Mizkif's stream!"
      },
      {
        date: "2021-02-14 07:31:05",
        text: "Do you guys like GTARP better with or without camera?"
      },
      {
        date: "2021-02-13 18:49:51",
        text: "@jschlatt @JustaMinx But then that would mean"
      },
      {
        date: "2021-02-13 18:44:35",
        text: "@JustaMinx why tf does this have 8k likes in 8 minutes"
      }
    ]
  );

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await streamDao.getStreamsByStreamerId(id);

        console.log(result);

        if(isMounted.current) setStreamerData(result);

      }catch (err){
        console.log(err);
        if(isMounted.current) setStreamerData([{error: `failed`}]);
      }

    }
    console.log(`mounted`);
    fetchData();
    return () => {
      isMounted.current = false;
    }
  }, [id])

  console.log(`render!`);
  return (
    <>
      <div>
      {
       (!streamerData) ? 
        <p>loading...</p>
      : 
        <>
          <StreamerInfo {...streamerData} />

          <Switch>

            <Route exact path={`/streamer/${id}`}>
              <Link to={`/streamer/${id}/insights`} id='insights'>
                Get Insights
              </Link>
              <div id='streams-tweets-wrapper'>
                <StreamsList streams={streamerData.streams} id={id}/>
                <TweetsList tweets={tweetsData} />
              </div>
            </Route>

            <Route exact path={`/streamer/${id}/insights`}>
              <Link to={`/streamer/${id}`} id='insights'>
                Back to streams and tweets
              </Link>
              <Insights id={id} />
            </Route>
            
          </Switch>
        </>
      }
      </div>
    </>
  );
}

export default InfoPage;