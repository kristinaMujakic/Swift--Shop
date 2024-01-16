import React, { useState, useContext, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { addTotalItems } = useContext(ShopContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    // Check if token exists in local storage to determine login status
    const token = localStorage.getItem('auth-token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="swiftshop logo" />
        <p onClick={() => { setMenu('shop'); }}>
          <Link to='/' style={{ textDecoration: 'none' }}>Swift Shop</Link>
          {menu === 'shop' ? <hr /> : <></>}
        </p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => { setMenu('electronics'); }}>
          <Link to='/electronics' style={{ textDecoration: 'none' }}>Electronics</Link>
          {menu === 'electronics' ? <hr /> : <></>}
        </li>

        <li onClick={() => { setMenu('jewelery'); }}>
          <Link to='/jewelery' style={{ textDecoration: 'none' }}>Jewelery</Link>
          {menu === 'jewelery' ? <hr /> : <></>}
        </li>

        <li onClick={() => { setMenu('mens'); }}>
          <Link to='/mens' style={{ textDecoration: 'none' }}>Men's clothing</Link>
          {menu === 'mens' ? <hr /> : <></>}
        </li>

        <li onClick={() => { setMenu('womens'); }}>
          <Link to='/womens' style={{ textDecoration: 'none' }}>Women's clothing</Link>
          {menu === 'womens' ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button>
            <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
          </button>
        )}
        <Link to='/cart'>
          <img className='cart' src={cart_icon} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{addTotalItems()}</div>
      </div>
    </div >
  );
};
