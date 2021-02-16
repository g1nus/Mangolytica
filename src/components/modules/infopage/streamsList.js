import React from 'react';

import StreamInfo from 'components/modules/infopage/streamInfo';

const StreamsList = function({streams, id}) {


  return (
    <>
      <div id='streams-list'>
      <p id='streams-list-title'>Past streams</p>
      {(streams.length === 0) ? 
        <p id='no-mango-match'>no streams yet :(</p> 
      : 
        <>
        {
          streams.map((result, index) =>( 
            <div key={index}> 
              <StreamInfo {...result} id={id} />
            </div>
          ))
        }
        </>
        }
      </div>
    </>
  );
}

export default StreamsList;