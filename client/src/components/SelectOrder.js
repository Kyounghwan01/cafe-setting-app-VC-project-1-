import React, { Component } from 'react';
import '../assets/style/View.scss';
import axios from 'axios';
import moment from 'moment';
import * as constants from '../constants/state';
import { TiShoppingCart } from 'react-icons/ti';

export default class SelectOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrange: [],
      userData: [],
      choiceMenuCategory: 'tea',
      orderList : {seatNumber : Number, order : []},
      initTable: {
        img: constants.TABLE,
        order: 1,
        board: 'table',
        type: 'table',
        sittingTime: Date,
        userId: null
      }
    };
  }

  componentDidMount() {
    const fetchTableData = async () => {
      const res = await axios.get(
        `/api/view/${this.props.tocken.substring(1)}`
      );
      if (!res.data.cafeData) {
        this.setState({ errorMessage: 'unauth' });
      } else {
        this.setState({
          arrange: res.data.cafeData.arrangemenet,
          userData: res.data.userData[0]
        });
      }
    };
    fetchTableData();
  }
  componentDidUpdate(){
    console.log(this.state.orderList);
  }

  renderPieceContainer(piece, index) {
    return (
      <li
        className="seats-list"
        key={index}
        data-id={index}
        onClick={e => {
          this.choiceSeats(e);
        }}
      >
        {piece ? (
          piece.type === 'table' ? (
            <div>
              <img
                alt="table"
                className="table"
                type={piece.type}
                src={piece.img}
              />
              <div className="seat-number">
                <p>{index}</p>
              </div>
            </div>
          ) : (
            <img
              alt="wall"
              className="wall"
              type={piece.type}
              src={piece.img}
            />
          )
        ) : null}
      </li>
    );
  }

  choiceSeats = e => {
    if (e.currentTarget.childNodes[0].childNodes[0].getAttribute('type') === 'table') {
      let copyData = this.state.arrange;
      const afterTwoHours = moment(
        Date.parse(new Date()) + 1000 * 60 * 120
      ).format('YYYY-MM-DDTHH:mm');
      const initSeats = {
        img: constants.SEATS,
        order: 1,
        board: 'table',
        type: 'seated',
        sittingTime: afterTwoHours,
        userId: this.state.userData._id
      };

      for (let i = 0; i < this.state.arrange.length; i++) {
        if (
          this.state.arrange[i] &&
          this.state.arrange[i].userId === this.state.userData._id
        ) {
          copyData[i] = this.state.initTable;
          this.setState({ arrange: copyData });
        }
      }
      copyData[e.currentTarget.getAttribute('data-id')] = initSeats;
      this.setState({ arrange: copyData, orderList : {seatNumber : e.currentTarget.getAttribute('data-id')} });
    }
  };

  submitSeat = async () => {
    try {
      await axios.post(`/api/seats/${this.props.tocken.substring(1)}`, {
        cafeArrange: this.state.arrange
      });
    } catch (e) {
      console.log(e);
    }
  };

  renderMenu = () => {
    if (this.props.listData) {
      return this.props.listData.map((el, index) => {
        if (el.category === this.state.choiceMenuCategory) {
          return el.children.map((me, index) => {
            return (
              <div
                key={index}
                className="category-menu"
                onClick={() => console.log(me.id)}
              >
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
      <div className="view-container">
        <div className="seats-container">
          <div className="shopping-cart">
            <TiShoppingCart size="50" />
          </div>
          <div className="seats-desc">
            <span>Step 1. 앉을 자리를 선택해주세요.</span>
          </div>
          <ol className="drag__solved-board">
            {this.state.arrange.map((piece, i) =>
              this.renderPieceContainer(piece, i)
            )}
          </ol>
          <div onClick={this.submitSeat}>자리 고정</div>
        </div>
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
      </div>
    );
  }
}
