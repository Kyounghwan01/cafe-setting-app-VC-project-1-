import React, { Component } from 'react';
import * as constants from '../constants/state';
import axios from 'axios';
import '../assets/style/View.scss';

export default class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceMenuCategory: 'caffee'
    };
  }

  renderMenu = () => {
    console.log(this.props.listData);
    if(this.props.listData){
      return this.props.listData.map((el, index) => {
        if(el.category === this.state.choiceMenuCategory){
          console.log(el);
          return el.children.map((me, index)=>{
            console.log(me);
            return (
              <div key={index} className="category-menu">
                <div>
                  <span>{me.name}</span>
                </div>
                <div>
                  <span>{me.price}원</span>
                </div>
                <div>
                  <span>{me.desc}</span>
                </div>
              </div>
            );
          })
        }
    })};}

  renderCategory = () => {
    console.log(this.props.listData);
    return this.props.listData.map((el, index) => {
      return (
        <div
          key={index}
          className="category-desc"
          data-id={el.category}
          onClick={() => this.renderOtherMeny(el.category)}
        >
          <span>{el.category}</span>
        </div>
      );
    });
  };

  renderOtherMeny = category => {
    this.setState({ choiceMenuCategory: category });
  };

  render() {
    return (
      <div className="menu-container">
        <div className="menu-desc">
          <span>
            Step 2. 메뉴를 고르시고 오른쪽 하단의 바구니 버튼을 클릭해주세요.
          </span>
        </div>
        <div className="banner">
          <div className="menu-selector">
            {this.props.listData ? (
              <>
                <span>ALWAYS BESIDE YOU, {this.state.choiceMenuCategory}</span>
                {this.renderCategory()}
              </>
            ) : (
              <div>잠시만 기다려 주세요</div>
            )}
          </div>
        </div>
        <div className="menu">{this.renderMenu()}</div>
      </div>
    );
  }
}
