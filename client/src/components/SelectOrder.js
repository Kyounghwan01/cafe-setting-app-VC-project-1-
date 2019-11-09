import React, { Component } from 'react';
import '../assets/style/View.scss';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as constants from '../constants/state';
import { TiShoppingCart } from 'react-icons/ti';
import ShoppingCart from './ShoppingCart';

export default class SelectOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrange: [],
      userData: [],
      choiceMenuCategory: 'tea',
      orderList: { seatNumber: null, order: [], open: false },
      orderDetail: { order: null, open: false },
      initTable: constants.INIT_TABLE
    };
  }

  componentDidMount() {
    const fetchTableData = async () => {
      const res = await axios.get(
        `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/view/${this.props.tocken.substring(1)}`
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

  renderPieceContainer(piece, index) {
    //자리 렌더링
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
            <div>
              <img
                alt="wall"
                className="wall"
                type={piece.type}
                src={piece.img}
              />
            </div>
          )
        ) : null}
      </li>
    );
  }

  choiceSeats = e => {
    //자리 고르기
    if (
      e.currentTarget.childNodes[0].childNodes[0].getAttribute('type') ===
      constants.TYPE_TABLE
    ) {
      let seatChangeToDB = this.state.arrange;
      let seatChangeToShoppingCart = this.state.orderList;
      const afterTwoHours = moment(
        Date.parse(new Date()) + 1000 * 60 * 120
      ).format('YYYY-MM-DDTHH:mm');
      const initSeats = {
        img: constants.SEATS,
        order: 1,
        board: constants.TYPE_TABLE,
        type: constants.TYPE_SEATED,
        sittingTime: afterTwoHours,
        userId: this.state.userData._id
      };

      for (let i = 0; i < this.state.arrange.length; i++) {
        if (
          this.state.arrange[i] &&
          this.state.arrange[i].userId === this.state.userData._id
        ) {
          seatChangeToDB[i] = this.state.initTable;
          this.setState({ arrange: seatChangeToDB });
        }
      }
      seatChangeToDB[e.currentTarget.getAttribute('data-id')] = initSeats;
      seatChangeToShoppingCart.seatNumber = e.currentTarget.getAttribute(
        'data-id'
      );

      this.setState({
        arrange: seatChangeToDB,
        orderList: seatChangeToShoppingCart
      });
    }
  };

  submitSeat = async () => {
    //cafe의 배치 스키마 패치하는 함수
    try {
      await axios.post(`http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/seats/${this.props.tocken.substring(1)}`, {
        cafeArrange: this.state.arrange
      });
    } catch (e) {
      console.log(e);
    }
  };

  OpenShoppingCart = () => {
    //고객 쇼핑카트 오픈
    let copyData = this.state.orderList;
    copyData.open = !copyData.open;
    this.setState({ orderList: copyData });
  };

  orderPushToShoppingCart = data => {
    //주문 디테일 화면에서 선택한 숫자만큼 장바구니로 전송
    let dupCheck = false;
    let copyData = this.state.orderList;
    copyData.order.forEach(el => {
      if (el.id === data.id) {
        dupCheck = true;
        el.count = data.count;
      }
    });
    if (!dupCheck) {
      copyData.order.push(data);
      this.setState({ orderList: copyData });
    }
    this.setState({ orderDetail: { open: false } });
  };

  renderMenu = () => {
    //메뉴 렌더링
    if (this.props.listData) {
      return this.props.listData.map((el, index) => {
        if (el.category === this.state.choiceMenuCategory) {
          return el.children.map((me, index) => {
            return (
              <div
                key={index}
                className="category-menu"
                onClick={() =>
                  this.setState({
                    orderDetail: {
                      open: true,
                      order: {
                        id: me.id,
                        name: me.name,
                        price: me.price,
                        count: 0
                      }
                    }
                  })
                }
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
    //카테고리 렌더링
    return this.props.listData.map((el, index) => {
      return (
        <div
          key={index}
          data-id={el.category}
          onClick={() => this.setState({ choiceMenuCategory: el.category })}
        >
          <span>{el.category}</span>
        </div>
      );
    });
  };

  handleCountChange = e => {
    let copyData = this.state.orderDetail;
    copyData.order.count = e.target.value;
    this.setState({ orderDetail: copyData });
  };

  render() {
    const { orderDetail } = this.state;
    return (
      //메인페이지
      <div className="view-container">
        <div className="seats-container">
          <div className="shopping-cart" onClick={this.OpenShoppingCart}>
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
                    ALWAYS BESIDE YOU,
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

        {orderDetail.open ? (
          <div className="order-list-container">
            <div className="order-list-desc">주문 상세 내용</div>
            <div className="order-content">
              <table>
                <thead>
                  <tr>
                    <td>상품정보</td>
                    <td>판매금액</td>
                    <td>수량</td>
                    <td>주문금액</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{orderDetail.order.name}</td>
                    <td>{orderDetail.order.price}₩</td>
                    <td>
                      <input
                        type="number"
                        name="count"
                        required
                        min="0"
                        onChange={this.handleCountChange}
                        defaultValue="0"
                      />
                      개
                    </td>
                    <td>
                      {orderDetail.order.price * orderDetail.order.count}₩
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="btn-group">
              <div
                onClick={() => {
                  if (orderDetail.order.count < 1) {
                    return alert('수량을 1개 이상으로 선택해주세요');
                  }
                  this.orderPushToShoppingCart({
                    id: orderDetail.order.id,
                    name: orderDetail.order.name,
                    price: orderDetail.order.price,
                    count: orderDetail.order.count
                  });
                  return alert('주문하신 내역이 장바구니에 담겼습니다');
                }}
              >
                <span>담기</span>
              </div>
              <div
                onClick={() => this.setState({ orderDetail: { open: false } })}
              >
                <span>닫기</span>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.orderList.open ? (
          //쇼핑카트 오픈
          <div className="order-list">
            <ShoppingCart
              order={this.state.orderList.order}
              seatNumber={this.state.orderList.seatNumber}
              tocken={this.props.tocken}
              cafeArrange={this.state.arrange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

SelectOrder.propTypes = {
  tocken: PropTypes.string.isRequired,
  listData: PropTypes.array
};
