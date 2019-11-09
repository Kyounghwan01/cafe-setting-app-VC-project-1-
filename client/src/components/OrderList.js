import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../assets/style/OrderList.scss';

export default class OrderList extends Component {

  changeComplete = async menuId => {
    const res = await axios.post(
      `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/cafes/complete/${this.props.tocken.substring(1)}`,
      {
        complete: true,
        id: menuId
      }
    );
    if (res.data.status === 'success') {
      window.location.reload();
    }
  };

  renderOrderList = () => {
    if (this.props.orderList) {
      return (
        <table>
          <thead>
            <tr>
              <td>고객</td>
              <td>주문시간</td>
              <td>메뉴 / 수량</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.props.orderList.map((el, index) => {
              return (
                <tr key={index}>
                  {el.complete ? null : (
                    <>
                      <td>{el.user_name}</td>
                      <td>{el.created_at.slice(11)}</td>
                      <td>
                        {el.menu.map((menu, index) => {
                          return (
                            <li key={index}>
                              <span>{menu.name}</span>
                              <span> / {menu.count}개</span>
                            </li>
                          );
                        })}
                      </td>
                      <td>
                        <div className="complete" onClick={() => this.changeComplete(el._id)}>
                          <span>완료</span>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };
  render() {
    return (
      <div className="order-container">
        <div className="order-desc">주문 목록</div>
        <div className="order-content">{this.renderOrderList()}</div>
      </div>
    );
  }
}

OrderList.propTypes = {
  tocken: PropTypes.string.isRequired,
  userId : PropTypes.string.isRequired,
  orderList : PropTypes.array.isRequired
};
