import React, { Component } from 'react';
import '../assets/style/View.scss';
import axios from 'axios';
import moment from 'moment';
import * as constants from '../constants/state';

export default class SelectSeat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrange: [],
      userData: [],
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
      this.setState({ arrange: copyData });
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

  render() {
    return (
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
    );
  }
}
