import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Home from '../Components/Home';
import DisplayPage from '../Components/DisplayPage';

function App() {
  return (
    <Router>
        <Header />

      <Outlet />

      <Routes>
        <Route path='/blue-it' element={<Home />}></Route>
        <Route path='/DisplayPage' element={<DisplayPage />}></Route>       
      </Routes>
    </Router>
  );
}

export default App;