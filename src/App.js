import Wallet from './Wallet.js';
import {BrowserRouter as Router, Routes, Link, Route} from 'react-router-dom'
import NavBar from './navbar.js';
import Home from './home.js';

function App() {
 
 

  return (
    <Router>
      <NavBar/>
      
      <Routes>
         <Route path='/Home' element={<Home/>} /> 
         <Route path='/wallet' element={<Wallet/>} /> 
      </Routes>

    </Router>
  );
}

export default App;
