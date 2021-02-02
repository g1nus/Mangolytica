import React, {useState, useEffect} from 'react';

import Error from 'components/modules/error';

//create a context object
const AppContext = React.createContext();

const AppProvider = function (props) {

  //user data
  const [user, setUser] = useState(null);
  //user data fetch flag
  const [userFetch, setUserFetch] = useState(true);
  //error
  const [error, setError] = useState(null);
  //title
  const [title, setTitle] = useState(<div className="nav-elements"> <h2 className="static-title">HOME</h2> </div>);
  //notification message
  const [notificationMessage, setNotificationMessage] = useState(undefined);

  //preparate an object to be insertd into context
  const contextObject ={
      user,
      setUser,
      userFetch,
      setUserFetch,
      error,
      setError,
      title,
      setTitle,
      notificationMessage,
      setNotificationMessage,
  };


  //effect on context mount to fetch user data if he's logged
  useEffect(() => {
    if(props.testing){ //data setup for testing
      setUser({name: `testing`, surname: `boi`, emai: `test@test.com`})
    }
  }, [])

  //if there isn't error
  if (!error) {
    return (
      //*set the values of contenxt*
      <AppContext.Provider value={contextObject}>
        {/*mount all components children, the parameters set inside the <> ... </>*/}
        {props.children}
      </AppContext.Provider>
    );
  }
  //if there is a error
  else {
    return (
      //*set the values of contenxt*
      <AppContext.Provider value={contextObject}>
        <Error/>
      </AppContext.Provider>
    )
  }


}

export {AppContext, AppProvider};