import React, { Component } from 'react';
import axios from 'axios';

export default class MenuTree extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.price = React.createRef();
    this.state = {
      list: props.node,
      updateModal: false
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  deleteMenu = async deleteId => {
    await axios.delete(`/api/cafes/menu/${deleteId}`);
    window.location.reload();
  };

  menuAndPriceChange = () => {
    let price = Math.floor(this.price.current.value / 100) * 100;
    if (
      window.confirm(
        `메뉴명 : ${this.name.current.value} 가격 : ${price} 이 맞나요?`
      )
    ) {
      axios.post(`/api/cafes/menu/${window.location.href.slice(34)}`, {
        name: this.name.current.value,
        price: price,
        id: this.state.updateModal.id
      });
      this.setState({
        list: {
          label: this.name.current.value,
          price: price
        }
      });

      alert('변경되었습니다');
    }
  };

  openList = () => {
    let newState = Object.assign({}, this.state.list);
    newState.state = this.state.list.state === 'open' ? 'close' : 'open';
    this.setState({ list: newState });
  };
  changeOpenClose = list => {
    if (list && list.children && list.children.length > 0) {
      return list.state === 'open' ? 'open' : 'close';
    }
  };

  render() {
    let list = this.state.list.children || [];
    let children = list.map((n, idx) => <MenuTree node={n} key={idx} />);
    if (children.length > 0) {
      children = <ul>{children}</ul>;
    }
    return (
      <li className={this.changeOpenClose(this.state.list)}>
        <i className="fa" onClick={this.openList}></i>
        <label>
          <span className="name">{this.state.list.label}</span>
          {this.state.list.price ? (
            <div data-id={this.state.list.id}>
              <span className="price">{this.state.list.price}</span>
              <button
                onClick={() => {
                  if (this.state.updateModal) {
                    this.setState({ updateModal: false });
                  } else {
                    this.setState({
                      updateModal: {
                        name: this.state.list.label,
                        price: this.state.list.price,
                        id: this.state.list.id
                      }
                    });
                  }
                }}
              >
                {this.state.updateModal ? '취소' : '수정'}
              </button>
              <button
                onClick={e => {
                  if (window.confirm('정말 삭제하시겠습니까?')) {
                    this.deleteMenu(
                      e.currentTarget.parentNode.getAttribute('data-id')
                    );
                    alert('삭제되었습니다');
                  }
                }}
              >
                삭제
              </button>
            </div>
          ) : null}
          {this.state.updateModal ? (
            <div>
              <label>{this.state.updateModal.name}</label>
              <input
                type="text"
                required
                autoFocus
                ref={this.name}
                defaultValue={this.state.updateModal.name}
              />
              <label>{this.state.updateModal.price}</label>
              <input
                type="number"
                step="100"
                required
                autoFocus
                ref={this.price}
                defaultValue={this.state.updateModal.price}
              />
              <input
                type="submit"
                onClick={this.menuAndPriceChange}
                value="바꾸기"
              />
            </div>
          ) : null}
        </label>
        {children}
      </li>
    );
  }
}
