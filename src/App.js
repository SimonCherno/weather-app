import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import {AppProvider} from './context/AppProvider';

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
