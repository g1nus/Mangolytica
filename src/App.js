import React, {useEffect} from 'react';

import Main from 'components/main';
import  {AppProvider} from 'components/providers/appProvider';

const App = function(props) {
  return (
    <div className="app">
      {/*mount a root context object*/}
      <AppProvider testing={true}>
        <div className="main-wrapper">
          <Main/>
        </div>
      </AppProvider>
    </div>
  );
}

export default App;