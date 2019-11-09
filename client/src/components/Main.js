import React, { Component } from 'react';
import '../assets/style/Main.scss';
import Header from './Header';
import Footer from './Footer';
import OrderList from './OrderList';
import * as constants from '../constants/state';
import moment from 'moment';
import axios from 'axios';
import PropTypes from 'prop-types';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extendTime: { time: null, arrangeIndex: null }
    };
  }

  renderPieceContainer(piece, index, boardName) {
    //테이블 맵 렌더
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
                onClick={e => {
                  if (!this.state.extendTime.time) {
                    this.setState({
                      extendTime: {
                        time: this.props.seats[index].sittingTime,
                        arrangeIndex: e.currentTarget.parentNode.getAttribute(
                          'data-id'
                        )
                      }
                    });
                  }
                }}
              />
            ) : (
              <div>
                {this.props.checkAdmin ? (
                  <img
                    className="other"
                    alt={constants.TYPE_WALL}
                    type={piece.type}
                    src={piece.img}
                    onClick={e => {
                      this.setState({
                        extendTime: {
                          time: this.props.seats[index].sittingTime,
                          arrangeIndex: e.currentTarget.parentNode.getAttribute(
                            'data-id'
                          )
                        }
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
                )}
              </div>
            )
          ) : null}
        </li>
      );
    }
  }

  async extendTimes(that) {
    //2시간 연장 db, state 변경
    const extendTimeResult = await axios.post(
      `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/extend/${that.props.tocken.substring(1)}`,
      {
        index: this.state.extendTime.arrangeIndex
      }
    );
    this.setState({
      extendTime: {
        time: extendTimeResult.data.hour
      }
    });
  }

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
          {/* admin일 경우 주문 목록 보이기, 아니면 banner 사진 */}
          {this.props.checkAdmin ? (
            <OrderList
              orderList={this.props.orderList}
              userId={this.props.userId}
              tocken={this.props.tocken}
            />
          ) : (
            <img
              alt="banner"
              src="http://www.coffeebeankorea.com/data/banner/%EB%A9%94%EC%9D%B8_3.jpg"
            />
          )}
        </div>
        <div className="content">
          <ol className="seat">
            {this.props.seats.map((piece, i) =>
              this.renderPieceContainer(piece, i, 'solved')
            )}
          </ol>
          <div className="content-desc">
            <span>
              어서오세요! <br />
              오늘은 자리가&nbsp;&nbsp;
              <span className="leftseat-count">{this.props.leftSeat}</span>
              &nbsp;&nbsp;개 있어요! <br />
              주문 하신 테이블은 <br />
              파란색 네모입니다
              <br />
            </span>
            {this.state.extendTime.time ? (
              <div className="extend-time-container">
                <span>
                  {this.state.extendTime.time.slice(11)} 까지 이용 가능합니다
                  <br />
                </span>
                {this.props.checkAdmin ? (
                  <div>
                    <span>2시간씩 연장 가능 합니다</span>
                    <div
                      className="extend-time"
                      onClick={() => this.extendTimes(that)}
                    >
                      <span>연장하기</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span>
                      이용 종료시간 30분 전부터 <br />
                      2시간씩 연장 가능 합니다
                    </span>
                    {moment
                      .duration(time.diff(this.state.extendTime.time))
                      .asMinutes() > -30 ? (
                      <div
                        className="extend-time"
                        onClick={() => this.extendTimes(that)}
                      >
                        <span>연장하기</span>
                      </div>
                    ) : null}
                  </div>
                )}
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
        <Footer />
      </div>
    );
  }
}

export default Main;

Main.propTypes = {
  headerElement: PropTypes.array.isRequired,
  tocken: PropTypes.string,
  seats: PropTypes.array.isRequired,
  leftSeat: PropTypes.number.isRequired,
  orderList: PropTypes.array,
  checkAdmin: PropTypes.bool.isRequired,
  userId: PropTypes.string
};
