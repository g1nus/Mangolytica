import React from 'react';
import {useParams} from 'react-router-dom';

const Insights = function(props) {

  let { id } = useParams();

  return (
    <>
      insights page for {id}
    </>
  );
}

export default Insights;