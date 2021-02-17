import React, {useState, useEffect} from 'react';

import { auth } from "services/firebase"
import Error from 'components/modules/error';

//create a context object
const AppContext = React.createContext();

const AppProvider = function (props) {

  //user data
  const [user, setUser] = useState(null);
  //error
  const [error, setError] = useState(null);
  //notification message
  const [notificationMessage, setNotificationMessage] = useState(undefined);

  //preparate an object to be insertd into context
  const contextObject ={
      user,
      setUser,
      error,
      setError,
      notificationMessage,
      setNotificationMessage,
  };


  //effect on context mount to fetch user data if he's logged
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if(user){
        setUser({name: user.displayName, picture: user.photoURL});
      }else{
        setUser(null);
      }
    })
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