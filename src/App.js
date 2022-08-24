import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/cart';
import Home from './pages/home';
import Login from './pages/login';

function App() {
  return (<Routes>
    <Route element={<Layout />}>
      <Route path='/' element={<Home />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
    </Route>
    <Route path='/login' element={<Login />} />
  </Routes>


  );
}

function Layout() {
  return (<>
    <nav className='header'>
      <Link to="/">Home</Link>
      <Link to="cart">Cart</Link>
    </nav>
    <main>
      <Outlet />
    </main>
  </>)
}

export default App;
