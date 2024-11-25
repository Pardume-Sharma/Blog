import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import BlogDisplay from './Pages/BlogDisplay/BlogDisplay';
import Login from './components/Loginpop_up/Login';
import './index.css';
import Footer from './components/Footer/Footer';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin}/> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Blogs' element={<BlogDisplay/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
};

export default App;
