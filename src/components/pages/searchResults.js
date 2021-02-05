import React, {useEffect, useState, useRef} from 'react';
import { useForm } from 'react-hook-form';

import {searchDao} from 'dao/search.dao';

const SearchResults = function(props) {

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  //refernce and mount cycle handler
  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
      searchDao.cancelRequest();
    }
  }, []) 

  const onSubmit = async function (data) {
    try{
      setLoading(true);
      let results = await searchDao.searchStreamer(data.query);
      setLoading(false);
      console.log(results.data);
      if(isMounted.current) setSearchResults(results.data);
    }catch (err){
      if(isMounted.current) setSearchResults([{error: `failed`}]);
    }
  }

  return (
    <>
      search page
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="query" ref={register({ required: true })} />
        {errors.query && <span>This field is required</span>}
        <input type='submit'/>
      </form>
      {(loading) ?
        "loading..."
      :
        <>
          {searchResults.map((result, index) => <p key={index}>{result.display_name} | {result.id} | {(result.is_live) ? "true" : "false"}</p>)}
        </>
      }
    </>
  );
}

export default SearchResults;