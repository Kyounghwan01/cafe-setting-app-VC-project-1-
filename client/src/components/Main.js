import React from 'react';
import '../assets/style/Main.scss';
import Header from './Header';
import Footer from './Footer';

//import banner from '../assets/img/bg1.png';

const Main = props => {
  console.log(props);
  const orderRoute = `/view${props.tocken}`;
  return (
    <div className="main-container">
      {props.tocken ? (
        <Header element={props.headerElement} tocken={props.tocken} />
      ) : (
        <Header element={props.headerElement} />
      )}
      <div className="main-banner">
        <img
          alt="banner"
          src="http://www.coffeebeankorea.com/data/banner/%EB%A9%94%EC%9D%B8_3.jpg"
        />
      </div>
      <div className="seats-order">
        <div className="current-seats"></div>
        <div className="order">
          <span>
            어서오세요! <br />
            오늘은 여기가 <br />
            비어있어요 <br />
          </span>
          {props.tocken ? (
            <a href={orderRoute}>
              <span>주문하기</span>
            </a>
          ) : (
            <a href="/login">
              <span>주문하기</span>
            </a>
          )}
        </div>
      </div>
      {/* <div className="main-banner">
        <img src={banner} />
      </div> */}
      <Footer />
    </div>
  );
};

export default Main;
