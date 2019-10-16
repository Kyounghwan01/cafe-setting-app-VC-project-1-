import React, { Component } from 'react';
import '../assets/style/View.scss';
import Header from './Header';
import Footer from './Footer';
import { TiShoppingCart } from 'react-icons/ti';
import axios from 'axios';
import moment from 'moment';
import * as constants from '../constants/state';


class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrange: [],
      menuList: [],
      userData: [],
      initTable: {
        img:constants.TABLE,
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
          menuList: res.data.cafeData.menu,
          userData: res.data.userData[0]
        });
      }
    };
    fetchTableData();
  }

  componentDidUpdate() {
    console.log(this.state.arrange);
  }

  renderMenu = () => {
    if (this.state.menuList) {
      return this.state.menuList.map((el, index) => {
        return (
          <div key={index}>
            <div>{el.name}</div>
            <div>{el.price}</div>
          </div>
        );
      });
    }
  };

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
            <img
              alt="table"
              className="table"
              type={piece.type}
              src={piece.img}
            />
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
    if (e.currentTarget.childNodes[0].getAttribute('type') === 'table') {
      let copyData = this.state.arrange;
      const now = moment(new Date(Date.parse(new Date) + 1000 * 60 * 120)).format('YYYY-MM-DDTHH:mm');
      const initSeats = {
        img:constants.SEATS,
        order: 1,
        board: 'table',
        type: 'seated',
        sittingTime: now,
        userId: this.state.userData._id
      };

      for (let i = 0; i < this.state.arrange.length; i++) {
        if (
          this.state.arrange[i] &&
          this.state.arrange[i].userId === this.state.userData._id
        ) {
          copyData[i] = this.state.initTable;
          this.setState({arrange : copyData});
        }
      }

      copyData[e.currentTarget.getAttribute('data-id')] = initSeats;
      this.setState({arrange : copyData});
    }
  };

  submitSeat = async () => {
    try{
      await axios.post(`/api/seats/${this.props.tocken.substring(1)}`, {
        cafeArrange: this.state.arrange
      });
    } catch (e){
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <div className="shopping-cart">
          <TiShoppingCart size="50" />
        </div>
        <Header element={this.props.headerElement} tocken={this.props.tocken} />
        <div className="view-container">
          <div className="seats-container">
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
                Step 2. 메뉴를 고르시고 오른쪽 하단의 바구니 버튼을
                클릭해주세요.
              </span>
            </div>
            <div className="menu">{this.renderMenu()}</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default View;
