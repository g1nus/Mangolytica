import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from 'components/home';
import SearchResults from 'components/pages/searchResults';
import StreamPage from 'components/pages/stream';
import InfoPage from "components/pages/infoPage";
import NotFoundPage from "components/pages/notFound";
import Search from "components/pages/search";
import Navigation from 'components/modules/navigation/navigation'

const Main = function() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" children={<Search />}/>
        <Route exact path="/search_res" children={<SearchResults />}/>
        <Route exact path="/streamer/:streamerId/stream/:streamId" children={<StreamPage />}/>
        <Route path="/streamer/:id" children={<InfoPage />}/>
        <Route children={<NotFoundPage />}/>
      </Switch>
      <div className='extra-margin'>
        
      </div>
    </>
  );
}

export default Main;