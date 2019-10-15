import React from 'react';
import uniqueId from 'lodash/uniqueId';
import '../assets/style/View.scss';
import Header from './Header';
import Footer from './Footer';
import { FaSquare } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';

let _ = require('lodash');

const View = props => {
  console.log(props);

  const renderSeats = () => {
    if (props.arrangeMent) {
      return props.arrangeMent.map((el, index1) => {
        return el.map((element, index2) => {
          let markup = (
            <FaSquare key={_.uniqueId()} size="50" color="black" data-set={[index1, index2]} />
          );
          let br = (
            <>
              <FaSquare key={_.uniqueId()} size="50" color="black" data-set={[index1, index2]} />
              <br />
            </>
          );
          // if(element === 0){
          //   markup = <FaSquare size="24" color="black" data-set={[index1,index2]}/>;
          //   br = <><FaSquare size="24" color="black" data-set={[index1,index2]}/><br /></>
          // }
          return index2 === el.length - 1 ? br : markup;
        });
      });
    }
  };

  //쇼핑카트는 우하단에 고정 쇼핑카트 누르면 내가 담은 메뉴 + 가격 총합, 최 하단 결제 버튼
  //메뉴 담으면 어떤거 담았다고 얼랏창, dispatch 담기 state 넣기
  //ui 자리선정 최상단
  //아래로 매뉴 알리기

  const renderMenu = () => {
    if (props.menuList) {
      return props.menuList.map((el, index) => {
        return (
          <div key={index}>
            <div>{el.name}</div>
            <div>{el.price}</div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div className="shopping-cart">
        <TiShoppingCart size="50" />
      </div>
      <Header element={props.headerElement} tocken={props.tocken} />
      <div className="view-container">
        <div className="seats-container">
          <div className="seats-desc">
            <span>Step 1. 앉을 자리를 선택해주세요.</span>
          </div>
          <div className="seats">{renderSeats()}</div>
        </div>
        <div className="menu-container">
          <div className="menu-desc">
            <span>
              Step 2. 메뉴를 고르시고 오른쪽 하단의 바구니 버튼을 클릭해주세요.
            </span>
          </div>
          <div className="menu">{renderMenu()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default View;
