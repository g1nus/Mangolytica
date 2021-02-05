import React, {useEffect, useState, useRef} from 'react';

import {searchDao} from 'dao/search.dao';

const SearchResults = function(props) {

  const [searchResults, setSearchResults] = useState([]);


  //refernce and mount cycle handler
  const isMounted = useRef(true)
  useEffect(() => {
    const query = window.location.hash.substring(window.location.hash.indexOf('query=') + 6).match(/[^(?|&|=)]*/)[0];

    const fetchData = async () => {
      try{
        let results = await searchDao.searchStreamer(query);
        console.log(results.data);
        if(isMounted.current) setSearchResults(results.data);
      }catch (err){
        console.log(err);
        if(isMounted.current) setSearchResults([{error: `failed`}]);
      }
    }

    fetchData();
    return () => {
      isMounted.current = false
    }
  }, []) 


  return (
    <>
      search page
      {(searchResults.length === 0) ?
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