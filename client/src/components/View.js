import React from 'react';
import '../assets/style/View.scss';
import Header from './Header';
import Footer from './Footer';
import { FaSquare } from 'react-icons/fa';
import { TiShoppingCart } from 'react-icons/ti';

const View = props => {
  console.log(props);

  const renderSeats = () => {
    if (props.arrangeMent) {
      return props.arrangeMent.map((el, index1) => {
        return el.map((element, index2) => {
          let markup = (
            <FaSquare size="50" color="black" data-set={[index1, index2]} />
          );
          let br = (
            <>
              <FaSquare size="50" color="black" data-set={[index1, index2]} />
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
      <Header element={props.headerElement} tocken={props.tocken} />
      <div className="view-container">
        <div className="left-side">
          <div className="seats">{renderSeats()}</div>
          <TiShoppingCart />
          <div className="order-list">
            <span>orderList</span>
          </div>
        </div>
        <div className="menu">{renderMenu()}</div>
      </div>
      <Footer />
      )}
    </div>
  );
};
export default View;
