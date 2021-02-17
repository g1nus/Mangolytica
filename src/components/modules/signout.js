import React from "react";
import { signOutFromGoogle } from "services/firebase";

const SignOut = function() {
  return (
      <button className="signout-button" onClick={signOutFromGoogle}>
        <span> logout from Google</span>
      </button>
  );
}

export default SignOut;
