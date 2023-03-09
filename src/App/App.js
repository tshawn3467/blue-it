import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Home from '../Components/Home';
import Categories from '../Components/Categories';
import ThirdThing from '../Components/ThirdThing';
import FourthThing from '../Components/FourthThing';

function App() {
  return (
    <Router>
        <Header />

      <Outlet />

      <Routes>
        <Route index element={<Home />}></Route>
        <Route path='/categories' element={<Categories />}></Route>
        <Route path='/thirdThing' element={<ThirdThing />}></Route>
        <Route path='/fourthThing' element={<FourthThing />}></Route>        
      </Routes>
    </Router>
  );
}

export default App;