import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../assets/style/View.scss';
import '../assets/style/Drag.scss';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

class ChangeSeats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wall: [
        {
          img:
            'https://pbs.twimg.com/profile_images/953306220315619330/iYXpLJ4m.jpg',
          order: 0,
          board: 'wall',
          type: 'wall'
        }
      ],
      table: [
        {
          img:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAA1BMVEXi4uIvUCsuAAAASElEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABODcYhAAEl463hAAAAAElFTkSuQmCC',
          order: 1,
          board: 'table',
          type: 'table'
        }
      ],
      solved: [],
      errorMessage: null
    };
  }

  componentDidMount() {
    const fetchTableData = async () => {
      const res = await axios.get(
        `/api/view/${this.props.tocken.substring(1)}`
      );
      if(!res.data.cafeData){
        this.setState({errorMessage : 'unauth'})
      } else {
        this.setState({ solved: res.data.cafeData[0].arrangemenet });
      }
    };
    fetchTableData();
  }

  handleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) {
      return;
    }
    const pieceOrder = e.dataTransfer.getData('text');
    let pieceData = this.state.wall.find(p => p.order === +pieceOrder);
    if (!pieceData) {
      pieceData = this.state.table.find(p => p.order === +pieceOrder);
    }
    const origin = this.state[pieceData.board];

    if (targetName === pieceData.board) {
      target = origin;
    }
    // origin[origin.indexOf(pieceData)] = undefined;
    target[index] = pieceData;
    pieceData.board = targetName;
    this.setState({ [targetName]: target });
  }

  handleDragStart(e, order) {
    const dt = e.dataTransfer;
    dt.setData('text/plain', order);
    dt.effectAllowed = 'move';
  }

  renderPieceContainer(piece, index, boardName) {
    if (boardName === 'solved') {
      return (
        <li
          key={index}
          data-id={index}
          onDragOver={e => e.preventDefault()}
          onDrop={e => this.handleDrop(e, index, boardName)}
          onDoubleClick={e => {
            if (e.currentTarget.childNodes[0]) {
              let changeSeat = this.state.solved.concat();
              changeSeat[e.currentTarget.getAttribute('data-id')] = null;
              this.setState({ solved: changeSeat });
            }
          }}
        >
          {piece && (
            <img
              alt="wall"
              draggable
              onDragStart={e => this.handleDragStart(e, piece.order)}
              src={piece.img}
            />
          )}
        </li>
      );
    } else {
      return (
        <li key={index}>
          {piece && (
            <img
              alt="table"
              draggable
              onDragStart={e => this.handleDragStart(e, piece.order)}
              type={boardName}
              src={piece.img}
            />
          )}
        </li>
      );
    }
  }

  submitData = async () => {
    if (window.confirm('정말 저장하시겠습니까??')) {
      try {
        await axios.post(`/api/cafes/seats/${this.props.tocken.substring(1)}`, {
          cafeArrange: this.state.solved
        });
        alert('저장되었습니다');
      } catch (e) {
        this.setState({ errorMessage: e.message });
      }
    }
  };

  render() {
    return (
      <div>
        {this.state.errorMessage ? (
          <Redirect
            to={{
              pathname: '/error',
              state: this.state.errorMessage
            }}
          />
        ) : (
          <div>
            <Header
              element={this.props.headerElement}
              tocken={this.props.tocken}
            />
            <div className="drag">
              <div className="drag-desc">
                <p>아래 아이콘을 격자 영역으로 드래그 & 드랍해주세요.</p>
                <p>격자 영역을 더블 클릭시 해당 영역의 아이콘이 삭제됩니다.</p>
              </div>
              <div className="drag-list">
                <div className="drag-non-space">
                  <ul className="drag__wall-board">
                    {this.state.wall.map((piece, i) =>
                      this.renderPieceContainer(piece, i, 'wall')
                    )}
                    <div>
                      <span>쓰지않는 공간</span>
                    </div>
                  </ul>
                </div>
                <ul className="drag__table-board">
                  {this.state.table.map((piece, i) =>
                    this.renderPieceContainer(piece, i, 'table')
                  )}
                  <div>
                    <span>테이블</span>
                  </div>
                </ul>
              </div>
              <ol className="drag__solved-board">
                {this.state.solved.map((piece, i) =>
                  this.renderPieceContainer(piece, i, 'solved')
                )}
              </ol>
              <a href="#">
                <div className="submit" onClick={this.submitData}>
                  <span>등록</span>
                </div>
              </a>
            </div>
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export default ChangeSeats;
