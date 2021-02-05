import React from 'react';
import User from 'components/modules/navigation/user';
import { Link } from 'react-router-dom';

const Navigation = function(props) {
  return (
    <nav>
      <Link id='nav-logo-wrapper' to='/'>
        <p id='nav-logo-text'>
          MangoLytica
        </p>
        <div className='nav-logo-underbar' id='one'/>
        <div className='nav-logo-underbar' id='two'/>
      </Link>
      <User />
    </nav>
  );
}

export default Navigation;