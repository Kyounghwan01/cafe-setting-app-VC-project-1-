import React, { useState, useReducer } from 'react';
import '../assets/style/Main.scss';
import logo from '../assets/img/logo.png';

const Header = () => {
  const [modal, setModal] = useState(false);
  return(
    <div className="header">
        <div className="header-logo">
          <img src={logo} />
          <span>It's my seat</span>
        </div>
        <div className="header-list">
          <span>SIGN-IN</span>
          <span>SIGN-UP</span>
          <span onClick={() => setModal(true)}>ABOUT</span>
        </div>
      </div>
  )
}
export default  Header;