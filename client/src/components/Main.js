import React, { Component } from 'react';
import '../assets/style/Main.scss';
import Header from './Header';
import Footer from './Footer';
import * as constants from '../constants/state';
import moment from 'moment';
import axios from 'axios';
//import banner from '../assets/img/bg1.png';

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      expireTime: null
    };
  }

  renderPieceContainer(piece, index, boardName) {
    if (boardName === 'solved') {
      return (
        <li className="seat-list" key={index} data-id={index}>
          {piece ? (
            this.props.userId && piece.userId === this.props.userId ? (
              <img
                className="my-seat"
                alt={constants.TYPE_WALL}
                type={piece.type}
                src={constants.MY_SEATS}
                onClick={() => {
                  this.setState({
                    expireTime: this.props.seats[index].sittingTime
                  });
                }}
              />
            ) : (
              <img
                className="other"
                alt={constants.TYPE_WALL}
                type={piece.type}
                src={piece.img}
              />
            )
          ) : null}
        </li>
      );
    }
  }

  async extendTime(that){
    const a = await axios.post(`/api/extend/${that.props.tocken.substring(1)}`,{
      value : 'qweklawemaweaw'
    });
    console.log(a);
  }

  // submitData = async () => {
  //   if (window.confirm('정말 저장하시겠습니까??')) {
  //     try {
  //       await axios.post(`/api/cafes/seats/${this.props.tocken.substring(1)}`, {
  //         cafeArrange: this.state.solved
  //       });
  //       alert('저장되었습니다');
  //     } catch (e) {
  //       this.setState({ errorMessage: e.message });
  //     }
  //   }
  // };


  render() {
    const orderRoute = `/view${this.props.tocken}`;
    const time = moment();
    const that = this;
    return (
      <div className="main-container">
        {this.props.tocken ? (
          <Header
            element={this.props.headerElement}
            tocken={this.props.tocken}
          />
        ) : (
          <Header element={this.props.headerElement} />
        )}
        <div className="main-banner">
          <img
            alt="banner"
            src="http://www.coffeebeankorea.com/data/banner/%EB%A9%94%EC%9D%B8_3.jpg"
          />
        </div>
        <div className="seats-order">
          <div className="order">
            <ol className="seat">
              {this.props.seats.map((piece, i) =>
                this.renderPieceContainer(piece, i, 'solved')
              )}
            </ol>
            <div>
              <span>
                어서오세요! <br />
                오늘은 자리가&nbsp;&nbsp;
                <span className="leftseat-count">{this.props.leftSeat}</span>
                &nbsp;&nbsp;개 있어요! <br />
                <br />
              </span>
              {this.state.expireTime ? (
                <div>
                  <span>
                    {this.state.expireTime.slice(11)} 까지 이용 가능합니다
                    <br />
                  </span>
                  <span>
                    이용 종료시간 50분 전부터 <br />
                    2시간씩 연장 가능 합니다
                  </span>
                  {moment
                    .duration(time.diff(this.state.expireTime))
                    .asMinutes() > -50 ? (
                    <div
                      onClick={()=>{this.extendTime(that)}}
                    >
                      연장하기
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {!this.props.leftSeat ? (
              <span></span>
            ) : this.props.tocken ? (
              <a href={orderRoute}>
                <span>주문하기</span>
              </a>
            ) : (
              <a href="/login">
                <span>주문하기</span>
              </a>
            )}
          </div>
        </div>
        {/* <div className="main-banner">
        <img src={banner} />
      </div> */}
        <Footer />
      </div>
    );
  }
}

export default Main;
