import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

import TrendingStreamers from 'components/modules/search/trendingStreamers';
import SearchButton from 'components/svg/searchButton';

const Search = function(props) {

  let history = useHistory();

  const [submittedFlag, setSubmittedFlag] = useState(false);

  useEffect(() => {
    const submitted = window.location.hash.substring(window.location.hash.indexOf('submitted=') + 10).match(/[^(?|&|=)]*/)[0];
    console.log(submitted)
    setSubmittedFlag(submitted === "true");

  }, []); 

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async function (data) {
    console.log(`submitting`, data);
    history.push(`/search_res?query=${data.query}`);
  }

  return (
    <div id='search-wrapper'>
      <img src='/mangologo.png' id='logo' />
      <form id='search-form' onSubmit={handleSubmit(onSubmit)}>
        <input type='text' name='query' placeholder='search for a streamer...' ref={register({ required: true })}/>
        <button type='submit'>
          <SearchButton />
        </button>
      </form>
      <TrendingStreamers />
      {(submittedFlag) ?
        <p id='submitted-info'>
          The users you've selected will appear in the database as soon as they've completed 2 streams
        </p>
      :
        <></>
      }
    </div>
  );
}

export default Search;