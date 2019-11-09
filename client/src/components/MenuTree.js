import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class MenuTree extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.price = React.createRef();
    this.desc = React.createRef();
    this.state = {
      list: props.node,
      updateModal: false
    };
    this.deleteMenu = this.deleteMenu.bind(this);
  }

  async deleteMenu(deleteId){
    const res = await axios.delete(`http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/cafes/menu/${deleteId}`);
    if(res.data.status === 'success'){
      window.location.reload();
    } else {
      alert('삭제 오류 관리자에게 문의하세요')
    }
  };

  menuAndPriceChange = () => {
    let price = Math.floor(this.price.current.value / 100) * 100;
    if (
      window.confirm(
        `메뉴명 : ${this.name.current.value} 가격 : ${price}원이 맞나요?`
      )
    ) {
      axios.post(`/api/cafes/menu/${window.location.href.slice(34)}`, {
        name: this.name.current.value,
        price: price,
        id: this.state.updateModal.id,
        desc: this.desc.current.value
      });
      this.setState({
        list: {
          label: this.name.current.value,
          price: price,
          desc: this.desc.current.value
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
            <div className="desc" data-id={this.state.list.id}>
              <p className="price">가격 : {this.state.list.price}원</p>
              <p>설명 : {this.state.list.desc}</p>
              {this.state.updateModal ? (
                <div className="modify-menu">
                  <div>메뉴 수정</div>
                  <p>{this.state.updateModal.name}</p>
                  <input
                    className="input-name"
                    name='name'
                    type="text"
                    required
                    ref={this.name}
                    defaultValue={this.state.updateModal.name}
                  />
                  <p>{this.state.updateModal.price}원</p>
                  <input
                    className="input-number"
                    type="number"
                    step="100"
                    required
                    ref={this.price}
                    defaultValue={this.state.updateModal.price}
                  />
                  <p>{this.state.updateModal.desc}</p>
                  <textarea
                    className="input-desc"
                    type="text"
                    ref={this.desc}
                    defaultValue={this.state.updateModal.desc}
                  />
                  <div>
                  <input
                    className="input-submit"
                    type="submit"
                    onClick={this.menuAndPriceChange}
                    value="변경"
                  />
                  </div>
                </div>
              ) : null}
              <div
                className="modify-cancel"
                onClick={() => {
                  if (this.state.updateModal) {
                    this.setState({ updateModal: false });
                  } else {
                    this.setState({
                      updateModal: {
                        name: this.state.list.label,
                        price: this.state.list.price,
                        desc: this.state.list.desc,
                        id: this.state.list.id
                      }
                    });
                  }
                }}
              >
                <span>{this.state.updateModal ? '취소' : '수정'}</span>
              </div>
              <div
                className="delete"
                onClick={e => {
                  //if (window.confirm('정말 삭제하시겠습니까?')) {
                    this.deleteMenu(
                      e.currentTarget.parentNode.getAttribute('data-id')
                    );
                    alert('삭제되었습니다');
                  //}
                }}
              >
                <span>삭제</span>
              </div>
            </div>
          ) : null}
        </label>
        {children}
      </li>
    );
  }
}

MenuTree.propTypes = {
  tocken: PropTypes.string,
  node : PropTypes.object.isRequired
};
