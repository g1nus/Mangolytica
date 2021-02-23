import React, {useRef, useEffect, useState} from 'react';
import {Link, Switch, Route, useParams} from 'react-router-dom';

import {streamerDao} from 'dao/streamer.dao';
import StreamerInfo from 'components/modules/infopage/streamerInfo';
import StreamsList from 'components/modules/infopage/streamsList';
import TweetsList from 'components/modules/infopage/tweetsList';
import Insights from './insights';
import LoadingText from 'components/modules/loadingText';

const InfoPage = function() {

  let { id } = useParams();
  const isMounted = useRef(true);

  const [streamerData, setStreamerData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await streamerDao.getStreamerInfo(id);

        if(isMounted.current) setStreamerData(result);

      }catch (err){
        console.log(err);
        if(isMounted.current) setStreamerData([{error: `failed`}]);
      }

    }

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
        <LoadingText />
      : 
        <>
          <StreamerInfo {...{
            twitchName: streamerData.twitchInfo.displayName, 
            twitchLoginName: streamerData.twitchInfo.loginName,
            twitchDescription: streamerData.twitchInfo.description,
            twitchFollowers: streamerData.twitchInfo.followers,
            twitterLoginName: streamerData.twitter_info.screen_name,
            twitterFollowers: streamerData.twitter_info.followers_count,
            profilePicture: streamerData.twitchInfo.profilePicture
          }} />

          <Switch>

            <Route exact path={`/streamer/${id}`}>
              <Link to={`/streamer/${id}/insights`} id='insights'>
                Get Insights
              </Link>
              <div id='streams-tweets-wrapper'>
                <StreamsList streams={streamerData.twitchInfo.streams} id={id}/>
                <TweetsList tweets={streamerData.twitter_info.tweets} title={'Past Tweets'}/>
              </div>
            </Route>

            <Route exact path={`/streamer/${id}/insights`}>
              <Link to={`/streamer/${id}`} id='insights'>
                Back to streams and tweets
              </Link>
              <Insights id={id} streamerInfo={streamerData.twitchInfo}/>
            </Route>
            
          </Switch>
        </>
      }
      </div>
    </>
  );
}

export default InfoPage;