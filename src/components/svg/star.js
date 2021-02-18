import React from "react";

const Star = function ({starred}) {

  console.log('rednering star')

    return (
      <svg className="star-icon" xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 1000 1000">
        <polygon className="st0-star-icon" points="500,57.3 643.8,348.8 965.4,395.5 732.7,622.3 787.7,942.7 500,791.4 212.3,942.7 267.3,622.3 
          34.6,395.5 356.2,348.8 " fill={starred ? '#F9EE7B' : 'transparent'}/>


     </svg>
    );
};

export default Star;