import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from './components/Homepage';
import Chatpage from './components/Chatpage';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/chat' component={Chatpage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
