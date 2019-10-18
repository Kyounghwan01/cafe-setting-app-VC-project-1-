import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../assets/style/ChangeMenu.scss';
import axios from 'axios';
import * as constants from '../constants/state';
import MenuTree from '../components/MenuTree';

export default class ChangeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModal: false
    };
  }
  componentDidUpdate() {
    console.log(this.props.category);
  }

  render() {
    const url = `/api/cafes/menu/new/${this.props.tocken.substring(1)}`;
    return (
      <div>
        <Header element={this.props.headerElement} tocken={this.props.tocken} />
        <div>
          가격의 100원 이하는 자동 내림 처리됩니다.
          {this.props.listData && this.props.tocken ? (
            <div>
              <button
                onClick={() => {
                  if (this.state.createModal) {
                    this.setState({ createModal: false });
                  } else {
                    this.setState({
                      createModal: {
                        name: null,
                        price: null,
                        category: null
                      }
                    });
                  }
                }}
              >
                {this.state.createModal ? '취소' : '추가'}
              </button>
              {this.state.createModal ? (
                <div>
                  <form action={url} method="POST">
                    <label>메뉴명</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      name="name"
                      ref={this.name}
                      placeholder="메뉴명을 입력해주세요"
                    />
                    <label>가격</label>
                    <input
                      type="number"
                      step="100"
                      required
                      autoFocus
                      name="price"
                      ref={this.price}
                      placeholder="가격을 100단위로 입력해주세요"
                    />
                    <label>카테고리</label>
                    <input
                      type="text"
                      required
                      autoFocus
                      name="category"
                      ref={this.category}
                      placeholder="카테고리를 입력해주세요"
                    />
                    <input type="submit" value="생성" />
                  </form>
                </div>
              ) : null}
              <MenuTree tocken={this.props.tocken} node={this.props.listData} />
            </div>
          ) : null}
        </div>
        <Footer />
      </div>
    );
  }
}
