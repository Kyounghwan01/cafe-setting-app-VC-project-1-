import React from 'react';
import '../assets/style/Main.scss';
import Header from './Header';
import Footer from './Footer';
import * as PAGE from '../constants/state';

const Signup = () => {

  const errorMessage = () => {
    let query = new URL(document.location).searchParams.get('error');
    if (query === 'dupId') {
      return <span className="error-message">중복된 id입니다</span>;
    } else if (query === 'wrongpassword') {
      return <span className="error-message">패스워드가 틀렸습니다</span>;
    } else if (query === 'badrequest'){
      return <span className="error-message">정보가 입력되지 않은 곳이 있습니다</span>;
    }
  };

  return (
    <div className="Signup-container">
      <Header element={[PAGE.ROUTE_MAIN, PAGE.ROUTE_SIGN_IN]} />
      <div className="sign-container">
        <div className="sign-title">
          <span>회원가입</span>
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
          <form className="form-signin" action="http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/signup" method="POST">
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
              <input
                type="password"
                required
                name="password2"
                placeholder="password를 한번 더 입력해 주세요"
              />
            </div>
            <input className="submit" type="submit" value="회원가입" />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
