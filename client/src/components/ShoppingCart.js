import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../assets/style/ShoppingCart.scss';
import axios from 'axios';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0
    };
  }

  componentDidMount() {
    const { order, seatNumber } = this.props;
    console.log(this.props);
    if (order) {
      let price = 0;
      order.map(el => {
        price = price + el.price * Number(el.count);
        return this.setState({ totalPrice: price });
      });
    }
  }

  submitSeat = async () => {
    const { order, seatNumber, tocken, cafeArrange } = this.props;
    if (order.length && seatNumber) {
      //cafe의 배치 스키마 패치하는 함수
      try {
        const res = await axios.post(`/api/seats/${tocken.substring(1)}`, {
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
        {order.length ? (
          order.map((el, index) => {
            return (
              <div key={index} className="order-container">
                <span>{el.name}</span>
                <span>{el.price} x </span>
                <span>{el.count} = </span>
                <span>{el.price * el.count} </span>
              </div>
            );
          })
        ) : (
          <div className="order-container">
            <span>메뉴를 선택해주세요</span>
          </div>
        )}
        <div>total price : {this.state.totalPrice}₩</div>
        <div className="payment" onClick={this.submitSeat}>
          <span>결제</span>
        </div>
      </div>
    );
  }
}
