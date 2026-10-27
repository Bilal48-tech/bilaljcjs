import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaBeer, FaHome, FaUser } from 'react-icons/fa'; 
import { SiVitest } from 'react-icons/si'; 
import { MdAssignmentTurnedIn } from 'react-icons/md'; 
import Home from "./components/Home";
import Test from "./components/Test";
import About from "./components/About"; 
import Work from './components/Work';
import "./App.css"; 

const NotFound = () => <h2 style={{ padding: '10px' }}>404 - Page Not Found</h2>;

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        
        {/* Navigation links layout */}
        <nav style={{ marginBottom: '30px', marginLeft: '15px', marginRight: '15px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          
          {/* 1. Home Icon - Blue Color */}
          <Link to="/">
            <FaHome size={22} color="#007bff" />
          </Link> 
          
          {/* 2. Vitest Icon - Greenish/Yellow (Vitest Brand Color) */}
          <Link to="/test">
            <SiVitest size={22} color="#fcc72b" />
          </Link> 
          
          {/* 3. User Icon - Purple Color */}
          <Link to="/about">
            <FaUser size={20} color="#6f42c1" />
          </Link>  
          
          {/* 4. Work Icon - Green Color */}
          <Link to="/work">
            <MdAssignmentTurnedIn size={22} color="#28a745" />
          </Link>
          
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
