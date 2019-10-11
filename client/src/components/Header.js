import React from 'react';
import '../assets/style/Main.scss';
import logo from '../assets/img/logo.png';

const Header = props => {
  console.log(props);
  //const [modal, setModal] = useState(false);
  return (
    <div>
      <div className='empty'></div>
      <div className='header'>
        <div className='header-logo'>
          <a href='/'><img src={logo} alt='logo'/></a>
          <span>It's my seat</span>
        </div>
        <div className='header-list'>
          {props.element.map((ele, i) => {
            switch (ele) {
              case 'SIGN-IN':
                return (
                  <a href='/login' key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'MAIN':
                return (
                  <a href='/' key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'SIGN-UP':
                return (
                  <a href='/signup' key={i}>
                    <span>{ele}</span>
                  </a>
                );
              default:
                return <span key={i}>{ele}</span>;
            }
          })}
          {/* <span>SIGN-IN</span>
          <span>SIGN-UP</span>
          <span onClick={() => setModal(true)}>ABOUT</span> */}
        </div>
      </div>
    </div>
  );
};
export default Header;
