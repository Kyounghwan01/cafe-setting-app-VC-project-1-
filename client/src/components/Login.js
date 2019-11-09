import React from 'react';
import '../assets/style/Main.scss';
import Header from './Header';
import Footer from './Footer';
import * as PAGE from '../constants/state';

const Login = () => {
  const errorMessage = () => {
    let query = new URL(document.location).searchParams.get('error');
    if (query === 'nonemail') {
      return <span className="error-message">email이 틀렸습니다.</span>;
    } else if (query === 'wrongpassword') {
      return <span className="error-message">패스워드가 틀렸습니다</span>;
    }
  };

  return (
    <div className="Login-container">
      <Header element={[PAGE.ROUTE_MAIN, PAGE.ROUTE_SIGN_UP]} />
      <div className="sign-container">
        <div className="sign-title">
          <span>로그인</span>
        </div>
        <div className="sign-body">
          <img
            alt="signup img"
            src="http://image.istarbucks.co.kr/common/img/util/mem/icon_find_sally.png"
          />
          <div>
            <span>이메일과 비밀번호를 입력해주세요.</span>
          </div>
          <div>{errorMessage()}</div>
          <form className="form-signin" action="http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/login" method="POST">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
