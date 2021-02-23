import React from "react";

const GameBar = function ({gameTunits, streamLength, viewersPerGame}) {

  let totalGames = viewersPerGame.length;
  let rbStep = 100/viewersPerGame.length;
  let gStep = 80/viewersPerGame.length;


  console.log(totalGames);

  let colors = viewersPerGame.map((game, idx) => {
    return [game.gameName, {color: `rgb(${255 - ((idx+1) * rbStep)},${100 - ((idx+1) * gStep)},${255 - ((idx+1) * rbStep)})`, avg: game.viewers}];
  })

  colors = Object.fromEntries(colors);
  console.log(colors)

  return (
    <div className='game-analysis'>
      <div className='game-bar'>
      {
          gameTunits.map((gameTunit, idx) => {
            
            let length = gameTunit.msTunitLength / streamLength;

            return(
              <div className='game-tunit' key={idx} style={{width: (length * 100) + '%', backgroundColor: colors[gameTunit.gameName].color}}>
                <div className='game-tunit-info'>
                  <p className='game-tunit-name'>{gameTunit.gameName}</p>
                  <p className='game-viewers'><i>(avg: {colors[gameTunit.gameName].avg})</i></p>
                  <p className='game-tunit-duration'>{gameTunit.tunitLength.substring(0, gameTunit.tunitLength.indexOf('.'))}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default GameBar;