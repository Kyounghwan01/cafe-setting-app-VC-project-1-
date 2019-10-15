import React, { Component } from 'react';
import '../assets/style/Main.scss';
import Header from './Header';
import Footer from './Footer';
//import banner from '../assets/img/bg1.png';

class Main extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  renderPieceContainer(piece, index, boardName) {
    if (boardName === 'solved') {
      return (
        <li
          className="seat-list"
          key={index}
          data-id={index}
        >
          {piece && (
            <img
              alt="wall"
              type={piece.type}
              src={piece.img}
            />
          )}
        </li>
      );
    }
  }

  render() {
    const orderRoute = `/view${this.props.tocken}`;
    return (
      <div className="main-container">
        {this.props.tocken ? (
          <Header element={this.props.headerElement} tocken={this.props.tocken} />
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
            <span>
              어서오세요! <br />
              오늘은&nbsp;&nbsp;
              <span className="leftseat-count">{this.props.leftSeat}</span>
              &nbsp;&nbsp;개의 자리가 <br />
              비어있어요 <br />
            </span>
            {this.props.tocken ? (
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
