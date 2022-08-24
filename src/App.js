import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/cart';
import Home from './pages/home';
import Login from './pages/login';
import { ACTION, useDispatch, useSelector } from './store';

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

function SearchBar() {

  const selectedCategory = useSelector(state => state.selectedCategory)
  const dispatch = useDispatch();
  console.log({ selectedCategory });
  const [categories, setCategories] = useState([]);
  useEffect(() => {

    fetchAllCategories();

  }, [])

  async function fetchAllCategories() {
    const result = await fetch('https://fakestoreapi.com/products/categories')
    setCategories(await result.json());

  }

  const handleCategoryChange = (e) => dispatch({ type: ACTION.UPDATE_SELECTED_CATEGORY, payload: e.target.value })

  return (<div className='filter'>
    <section className='filter__category'>
      <select name="category-filter" id="category-filter" onChange={handleCategoryChange} value={selectedCategory}>
        <option value="all">all</option>
        {categories?.map(category => <option key={category} value={category}>{category}</option>)}
      </select>
    </section>
    <section className='filter__text'></section>
  </div>)
}

function Header() {
  return (<nav className='header'>
    <section className='header__title'>
      <Link to="/">
        <h2>E-Comm</h2>
      </Link>
    </section>
    <section className='header__searchbar'>
      <SearchBar />
    </section>
    <section className='header__navigation'>
      Welcome user
      <Link to="cart">Cart</Link>
    </section>

    {/* <Link to="/">Home</Link>
    <Link to="cart">Cart</Link> */}
  </nav>)
}

function Layout() {
  return (<>
    <Header />
    <main className='layout__content'>
      <Outlet />
    </main>
  </>)
}

export default App;
