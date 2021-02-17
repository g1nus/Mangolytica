import React, {useContext} from 'react';

import {AppContext} from "components/providers/appProvider";
import Login from 'components/modules/login';
import SignOut from 'components/modules/signout';

const User = function(props) {

  //get data from global context
  const appConsumer = useContext(AppContext);
  
  return (
    <>
      {(appConsumer.user) ? 
        <div id='nav-user'>
          <img src={appConsumer.user.picture} id='user-propic' height='44px' width='44px'/>
          <SignOut />
        </div>
      :
        <div id='nav-user-loggedout'>
          <Login />
        </div>
      }
    </>
  );
}

export default User;