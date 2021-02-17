import React from "react";
import { signInWithGoogle } from "services/firebase";

const Login = function() {
  return (
      <button className="login-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/fluent/2x/google-logo.png" alt="google icon" height='30px' width='30px'/>
        <span> Continue with Google</span>
      </button>
  );
}

export default Login;