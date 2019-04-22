import React from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';

const FlashApp = () => (
  <div>
    <Header />
    <Main />
  </div>
)

const App = () => (
  <div className="App">
    <BrowserRouter>
      <FlashApp/>
    </BrowserRouter>
  </div>
);

export default App;