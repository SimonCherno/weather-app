import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import Favorites from './routes/Favorites';
import {AppProvider} from './services/AppProvider';

function App() {
  return <>
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </Router>
    </AppProvider>
  </>
};
export default App;
