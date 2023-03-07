import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import { routes } from './routes';
import Home from '../Components/Home';
import Categories from '../Components/Categories';
import ThirdThing from '../Components/ThirdThing';

function App() {
  return (
    <Router>
      <nav>
        <Header />
        <ul>
          <li>
            <NavLink to={routes.home}>Home</NavLink>
          </li>
          <li>
            <NavLink to={routes.categories}>Categories</NavLink>
          </li>
          <li>
            <NavLink to={routes.thirdThing}>Third Thing</NavLink>
          </li>
        </ul>
      </nav>

      <Outlet />

      <Routes>
        <Route index element={<Home />}></Route>
        <Route index element={<Categories />}></Route>
        <Route index element={<ThirdThing />}></Route>        
      </Routes>
    </Router>
  );
}

export default App;