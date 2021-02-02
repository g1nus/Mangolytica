import React from 'react';
import {HashRouter as Router} from 'react-router-dom';

import App from 'App';

const AppRouter = function() {
  return (
  <Router basename={"/"}>
    <App/>
  </Router>
  );
}

export default AppRouter;