import React, {useEffect, useState} from 'react';

const ErrorPage = function(props) {

  const eyeSet = ['X', 'O', 'U', '-', '^', '*', '+']

  const mouthSet = ['w', '[', '|', '(', '/', 'O']

  const [face, setFace] = useState({L: 'X', R: 'X', M: '|'})

  useEffect(() => {
    const eyeInterval = setInterval(() => {
      console.log('generating eye');
      setFace({
        L: eyeSet[Math.floor(Math.random() * Math.floor(eyeSet.length))], 
        R: eyeSet[Math.floor(Math.random() * Math.floor(eyeSet.length))], 
        M: mouthSet[Math.floor(Math.random() * Math.floor(mouthSet.length))]
      })
    }, 150);
    return () => {
      clearInterval(eyeInterval);
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src="/mango.png" className="App-logo" alt="logo" />
        <p>
          <code>Oops! MangoLytica is lost</code>
        </p>
        <div className='face'>
          <div className='eyes'>
            <div className='eye1'>
              {face.L}
            </div>
            <div className='eye1'>
              {face.R}
            </div>
          </div>
          <div className='mouth' style={{transform: (face.M === 'w') ? '' : 'rotate(90deg)'}}>
            {face.M}
          </div>
        </div>
        <p className='error'>
          <code>There was an error...</code>
        </p>
      </header>
    </div>
  );
}

export default ErrorPage;