import React from 'react';
//import FacebookLogin from 'react-facebook-login';
// /{ useState, useReducer }
import '../assets/style/Login.scss';
import Header from './Header';
import Footer from './Footer';
// import Axios from 'axios';

const Login = props => {
  console.log(props);
  const headerElement = ['MAIN', 'SIGN-UP', 'ABOUT'];

  // const responseFacebook = response => {
  //   console.log(response);
  //   // Axios.get()
  // };
  const errorMessage = message => {
    if (message === '?nonemail') {
      return <span className="error-message">email이 틀렸습니다.</span>;
    } else if (message === '?wrongpassword') {
      return <span className="error-message">패스워드가 틀렸습니다</span>;
    } else if (message === '?success') {
      return <span className="error-message">성공했습니다</span>;
    }
  };

  return (
    <div className="Login-container">
      <Header element={headerElement} />
      <div>{errorMessage(props.location.search)}</div>
      <form className="form-signin" action="/api/login" method="POST">
        <div className="group">
          <input
            type="email"
            required
            autoFocus
            name="email"
            placeholder="e-mail"
          />
          <input
            type="password"
            required
            name="password"
            placeholder="password"
          />
        </div>
        <input className="submit" type="submit" value="로그인" />
      </form>
      {/* <div className="login-body">
        <FacebookLogin
          appId="937473999950198"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook} // 콜백함수 지정( container에 생성 )
          icon="fa-facebook-square"
          textButton={'Facebook으로 로그인하기'}
        />
      </div> */}
      <Footer />
    </div>
  );
};

export default Login;
