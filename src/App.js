import React from 'react';
import Chat from './components/Chat';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div>
      <Chat />
    </div>
  );
  // return (
  //   <Router basename={'https://geoka123.github.io/fhbot-front-end/'}>
  //     {'/'}
  //   </Router>
  // );
}

export default App;
