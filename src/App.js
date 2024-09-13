import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Jobs from './components/Jobs/jobs';
import Bookmarks from './components/Bookmarks/bookmarks';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Jobs />} >
           
          </Route>
          <Route path="/bookmarks" element = { <Bookmarks/>}>
           
          </Route>
          
        </Routes>
        <Navbar/>
    </BrowserRouter>
    
  );
}

export default App;
