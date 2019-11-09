import React from 'react';
import PropTypes from "prop-types";
import '../assets/style/Main.scss';
import logo from '../assets/img/logo.png';
import * as PAGE from '../constants/state';

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
          {props.element.map((types, i) => {
            switch (types) {
              case PAGE.ROUTE_SIGN_IN:
                return (
                  <a href="/login" key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_MAIN:
                let mainRoute = '/';
                if (props.tocken) {
                  mainRoute = `/${props.tocken}`;
                }
                return (
                  <a href={mainRoute} key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_SIGN_UP:
                return (
                  <a href="/signup" key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_LOG_OUT:
                return (
                  <a href="/" key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_ORDER:
                const orderRoute = `/view${props.tocken}`;
                return (
                  <a href={orderRoute} key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_CHANGE_SEATS:
                const changeSeatsRoute = `/change/seats${props.tocken}`;
                return (
                  <a href={changeSeatsRoute} key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_CHANGE_MENU:
                const changeMenuRoute = `/change/menu${props.tocken}`;
                return (
                  <a href={changeMenuRoute} key={i}>
                    <span>{types}</span>
                  </a>
                );
              case PAGE.ROUTE_MY_PAGE:
              const myPageRoute = `/mypage${props.tocken}`;
              return (
                <a href={myPageRoute} key={i}>
                  <span>{types}</span>
                </a>
              );
              default:
                return <span key={i}>{types}</span>;
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default Header;

Header.propTypes={
  element : PropTypes.array.isRequired,
  tocken : PropTypes.string
}