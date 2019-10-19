import React, { Component } from 'react';
import '../assets/style/View.scss';

export default class SelectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceMenuCategory: 'tea'
    };
  }

  renderMenu = () => {
    if (this.props.listData) {
      return this.props.listData.map((el, index) => {
        if (el.category === this.state.choiceMenuCategory) {
          return el.children.map((me, index) => {
            return (
              <div key={index} className="category-menu" onClick={() => console.log(me.id)}>
                <div className="category-menu-name">
                  <span>{me.name}</span>
                </div>
                <div className="category-menu-desc">
                  <span>{me.desc}</span>
                </div>
                <div className="category-menu-price">
                  <span>{me.price}₩</span>
                </div>
              </div>
            );
          });
        } else {
          return null;
        }
      });
    }
  };

  renderCategory = () => {
    return this.props.listData.map((el, index) => {
      return (
        <div
          key={index}
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
                <span>
                  ALWAYS BESIDE YOU,{' '}
                  <span>{this.state.choiceMenuCategory}</span>
                </span>
                <div className="category-desc">{this.renderCategory()}</div>
              </>
            ) : (
              <div className="loading">
                <span>잠시만 기다려 주세요...</span>
              </div>
            )}
          </div>
        </div>
        <div className="menu">{this.renderMenu()}</div>
      </div>
    );
  }
}