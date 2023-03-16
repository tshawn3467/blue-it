import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Home from '../Components/Home';
import ThirdThing from '../Components/ThirdThing';

function App() {
  return (
    <Router>
        <Header />

      <Outlet />

      <Routes>
        <Route index element={<Home />}></Route>
        <Route path='/ThirdThing' element={<ThirdThing />}></Route>       
      </Routes>
    </Router>
  );
}

export default App;