import React, {useContext, useEffect} from "react";

import {AppContext} from "components/providers/appProvider";

/**
 * this is home component
 */
const Home = function (props) {
  //get data from global context
  const appConsumer = useContext(AppContext);

  //set title when component mounts
  useEffect(() => {
      appConsumer.setTitle(<div className="nav-elements"> <h2 className="static-title">HOME</h2> </div>);
      console.log(appConsumer);
  },[])//run on component mount

  return (
    <div className="App">
      <header className="App-header">
        <img src="/mango.png" className="App-logo" alt="logo" />
        <p>
          <code>MangoLytica</code>
        </p>
        <p>
          <code>{(appConsumer.user) ? appConsumer.user.name : "loading"}</code>
        </p>
      </header>
    </div>
  );
};


export default Home;