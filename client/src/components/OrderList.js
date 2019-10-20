import React, { Component } from 'react';
import axios from 'axios';

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order : null
    }
  }
  componentDidMount() {
    console.log(this.props);
  }

  changeComplete = async (menuId) => {
    const res = await axios.post(`/api/cafes/complete/${this.props.tocken.substring(1)}`,{
      complete : true,
      id : menuId
    });
    console.log(res)
  }

  renderOrderList = () => {
    if (this.props.orderList) {
      return this.props.orderList.map((el, index) => {
        return (
          <div key={index}>
            {el.complete ? null : (
              <>
                <div>
                  <span>고객 : {el.user}</span>
                </div>
                <div>
                  <span>주문시간 : {el.created_at.slice(11)}</span>
                </div>
                <div>
                  <span>주문 메뉴</span>
                  {el.menu.map((menu, index) => {
                    return (
                      <li key={index}>
                        <span>{menu.name}</span>
                      </li>
                    );
                  })}
                  <button onClick={()=>this.changeComplete(el._id)}>
                    <span>완료버튼</span>
                  </button>
                </div>
              </>
            )}
          </div>
        );
      });
    }
  };
  render() {
    return <div>{this.renderOrderList()}</div>;
  }
}
