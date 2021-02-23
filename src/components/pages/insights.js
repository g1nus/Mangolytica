import Info from 'components/svg/info';
import React, {useState, useEffect, useRef} from 'react';

import {streamerDao} from 'dao/streamer.dao';
import HourlyActivity from 'components/modules/insightspage/hourlyActivity';
import DateActivity from 'components/modules/insightspage/dateActivity';
import StreamStarts from 'components/modules/insightspage/streamStarts';
import LoadingText from 'components/modules/loadingText';

const Insights = function({id, streamerInfo}) {

  const [streamerInsights, setStreamerInsights] = useState(undefined)

  const isMounted = useRef(true);
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const result = await streamerDao.getStreamerInsights(id);

        console.log(result)

        if(isMounted.current) setStreamerInsights({...result, maximalPeak: Math.ceil(Math.max(result.dateLikesPeak.likes, result.dateViewersPeak.viewers)/100)*100 + 400});

      }catch (err){
        console.log(err);
        if(isMounted.current) setStreamerInsights([{error: `failed`}]);
      }

    }

    fetchData();
    return () => {
      isMounted.current = false;
    }
  }, [id])

  return (
    <div id='insights-wrapper'>
      {
        (!streamerInsights) ? 
          <LoadingText />
        :
          <>
            <p id='mango-score'>
              Mango score is: <span id='score'> {streamerInsights.score} </span>
            </p>
            <HourlyActivity {...{dailyActivity: streamerInsights.dailyActivity, dailyTweetPeak: streamerInsights.dailyTweetPeak, dailyAverageViewers: streamerInsights.dailyAverageViewers, sleep: streamerInsights.sleep}} />
            <DateActivity {...{dateActivity: streamerInsights.dateActivity, dateLikesPeak: streamerInsights.dateLikesPeak, dateViewersPeak: streamerInsights.dateViewersPeak, maximalPeak: streamerInsights.maximalPeak}} />
            <StreamStarts dailyActivity={streamerInsights.dailyActivity} maxStreamStarts={streamerInsights.maxStreamStarts}/>

            <div className='extra-insights'>
              <div className='fav-games'>
                <p className='streamer-name-games'>
                  <span className='hue-name'>{streamerInfo.displayName}</span>'s favorite games:
                </p>
                <div className='fav-games-list'>
                  {
                    streamerInsights.favoriteGames.map((game, idx) => 
                      <p key={idx} className='game-name'>
                        {game.gameName} <i>({game.counts})</i>
                      </p>
                    )
                  }
                </div>
                <p className='streamer-name-words'>
                  <span className='hue-name'>{streamerInfo.displayName}</span>'s favorite tweet words:
                </p>
                <div className='frequent-words-list'>
                  {
                    streamerInsights.twitterFrequentWords.map((word, idx) => 
                      <p key={idx} className='word-name'>
                        {word}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </>
      }

    </div>
  );
}

export default Insights;