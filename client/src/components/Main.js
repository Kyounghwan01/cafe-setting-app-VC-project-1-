import React, { useState, useReducer } from 'react';
import { userReducer, initialState } from '../reducers';
import * as dispatchFunction from '../actions';
import '../assets/style/Main.scss';
import banner from '../assets/img/bg1.png';
import Header from './Header';
import Footer from './Footer';

const Main = props => {
  console.log(props);
  const [modal, setModal] = useState(false);

  return (
    <div className="main-container">
      <div className="empty"></div>
      <Header />
      <div className="main-banner">
        <img src="http://www.coffeebeankorea.com/data/banner/%EB%A9%94%EC%9D%B8_3.jpg" />
      </div>
      <div className="seats-order">
        <div className="current-seats"></div>
        <div className="order">
          <span>
            어서오세요! <br />
            오늘은 여기가 <br />
            비어있어요 <br />
          </span>
          <button>
            <span>주문하기</span>
          </button>
        </div>
      </div>
      <div className="main-announce">
        <div className="announce">
          <span>
            안녕하세요 !!
            <br />
            <br />
            저희는 지정 좌석 카페입니다. <br />
            <br />
            저희는 결제시간 기준 2시간 후에 좌석을 만료합니다.
            <br />
            <br />
            더 이용을 원하시면 카운트에 문의 부탁드립니다. <br />
            <br />
            이용해주셔서 감사합니다.
          </span>
        </div>
      </div>
      {/* <div className="main-banner">
        <img src={banner} />
      </div> */}
      <Footer />
      <div>
        {modal ? (
          <div className="modal">
            <span>
              저희는 지정 좌석 카페입니다. <br />
              저희는 결제시간 기준 2시간 후에 좌석을 만료합니다.
              <br />
              더 이용을 원하시면 카운트에 문의 부탁드립니다. <br />
              이용해주셔서 감사합니다.
            </span>
            <button onClick={() => setModal(false)}>닫기</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Main;

//const [user, dispatchUser] = useReducer(userReducer, initialState);
// let label = 'user';
// if (user.isAdmin) {
//   label = 'admin';
// }

// const reset = () => dispatchUser(dispatchFunction.reset());
// const toggleToBeAdmin = () => dispatchUser(dispatchFunction.toggleToBeAdmin());
// const updateNickname = event =>
//   dispatchUser(dispatchFunction.updateNickName(event.target.value));
// const updateEmail = event =>
//   dispatchUser(dispatchFunction.updateEmail(event.target.value));
//   <div>
//     <label>{label}</label>
//     <h1>{user.nickname}</h1>
//     <h3>{user.email}</h3>
//     <button onClick={reset}>RESET</button>
//     <button onClick={toggleToBeAdmin}>toggle admin mode</button>
//     <input type="text" onChange={updateNickname} />
//     <input type="text" onChange={updateEmail} />
//   </div>
