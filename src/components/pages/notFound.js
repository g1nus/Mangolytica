import React from 'react';

const NotFoundPage = function(props) {
  return (
    <div className="App App-404">
      <header className="App-header App-404-header">
        <img src="/mango.png" className="App-logo" alt="logo" />
        <p className='error-404'>
          <code>404 page not found</code>
        </p>
      </header>
    </div>
  );
}

export default NotFoundPage;