import React, { Component } from 'react';
import '../assets/style/ShoppingCart.scss';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    };
    this.submitSeat = this.submitSeat.bind(this);
  }

  componentDidMount() {
    const { order } = this.props;
    if (order) {
      let price = 0;
      order.map(el => {
        price = price + el.price * Number(el.count);
        return this.setState({ totalPrice: price });
      });
    }
  }

  async submitSeat ()  {
    const { order, seatNumber, tocken, cafeArrange } = this.props;
    if (order.length && seatNumber) {
      //cafe의 배치 스키마 패치하는 함수
      try {
        const res = await axios.post(`http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/seats/${tocken.substring(1)}`, {
          cafeArrange: cafeArrange,
          order: order
        });
        if (res.data.status === 'success') {
          alert('주문 성공하였습니다.');
          window.location = `/${tocken}`;
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('먼저 메뉴와 좌석을 선택해주세요');
    }
  };

  render() {
    const { seatNumber, order } = this.props;
    return (
      <div className="shopping-cart-container">
        <div className="shopping-cart-desc">장바구니 내역</div>
        <div className="select-seat">
          <p>선택한좌석</p>
          {seatNumber ? (
            <span>{seatNumber}</span>
          ) : (
            <span>자리선택해주세요</span>
          )}
        </div>
        <div className="order-content">
          <table>
            <thead>
              <tr>
                <td>상품정보</td>
                <td>판매금액</td>
                <td>수량</td>
                <td>주문금액</td>
              </tr>
            </thead>
            <tbody>
              {order.length ? (
                order.map((el, index) => {
                  return (
                    <tr key={index}>
                      <td>{el.name}</td>
                      <td>{el.price}₩</td>
                      <td>{el.count}</td>
                      <td>{el.price * el.count}₩</td>
                    </tr>
                  );
                })
              ) : (
                <td colSpan="4">메뉴를 선택해 주세요</td>
              )}
            </tbody>
          </table>
        </div>

        <div className="total-price">
          <span>총 주문 금액 : </span>
          <span>{this.state.totalPrice}₩</span>
        </div>

        <div className="payment" onClick={this.submitSeat}>
          <span>결제</span>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  cafeArrange : PropTypes.array.isRequired,
  order : PropTypes.array.isRequired,
  seatNumber : PropTypes.string.isRequired,
  tocken : PropTypes.string.isRequired,
};
