import React from 'react';
import '../assets/style/Main.scss';
import logo from '../assets/img/logo.png';

const Header = props => {
  return (
    <div>
      <div className="empty"></div>
      <div className="header">
        <div className="header-logo">
          <img src={logo} alt="logo" />
          <span>It's my seat</span>
        </div>
        <div className="header-list">
          {props.element.map((ele, i) => {
            switch (ele) {
              case 'SIGN-IN':
                return (
                  <a href="/login" key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'MAIN':
                let mainRoute = '/';
                if(props.tocken){
                  mainRoute = `/${props.tocken}`;
                }
                return (
                  <a href={mainRoute} key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'SIGN-UP':
                return (
                  <a href="/signup" key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'LOG-OUT':
                return (
                  <a href="/" key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'ORDER':
                const orderRoute = `/view${props.tocken}`;
                return (
                  <a href={orderRoute} key={i}>
                    <span>{ele}</span>
                  </a>
                );
              case 'CHANGE-SEATS':
                const changeSeatsRoute = `/change/seats${props.tocken}`;
                return (
                  <a href={changeSeatsRoute} key={i}>
                    <span>{ele}</span>
                  </a>
                )
              default:
                return <span key={i}>{ele}</span>;
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default Header;
