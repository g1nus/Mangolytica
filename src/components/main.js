import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from 'components/home';
import SearchPage from 'components/pages/search';
import StreamerPage from "./pages/streamer";
import NotFoundPage from "./pages/notFound";

const Main = function() {
  return (
    <Switch>
      <Route exact path="/" children={<Home />}/>
      <Route exact path="/search" children={<SearchPage />}/>
      <Route path="/streamer/:id" children={<StreamerPage />}/>
      <Route children={<NotFoundPage />}/>
    </Switch>
  );
}

export default Main;