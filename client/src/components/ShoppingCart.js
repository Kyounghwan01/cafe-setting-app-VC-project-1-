import React, { Component } from 'react';
import '../assets/style/ShoppingCart.scss';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cl : false
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, function(){console.log(this.state)});
  }

  render() {
    const { seatNumber, order } = this.props;
    return (
      <div className="shopping-cart-container">
        <div className="shopping-cart-desc">
          장바구니 내역
        </div>
        <div className="select-seat">
          <p>선택한좌석</p>
          {seatNumber ?
            <span>{seatNumber}</span>
           : <span>자리선택해주세요</span>}
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
        <div className='payment' ><span>결제</span></div>
      </div>
    );
  }
}
