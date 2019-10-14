import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import originalImage from './images/ny_original.jpg';
import './App.scss';

class Jigsaw extends Component {
  state = {
    wall: [],
    wallTest: [],
    chair: [],
    chairTest: [],
    solved: []
  };

  componentDidMount() {
    const wall = [...Array(1)].map((_, i) => ({
      img: `ny_30.jpg`,
      order: i,
      board: 'wall',
      type: 'wall'
    }));
    const chair = [...Array(1)].map((_, i) => ({
      img: `ny_10.jpg`,
      order: i + 40,
      board: 'chair',
      type: 'chair'
    }));

    this.setState({
      wall,
      wallTest: [...wall],
      chair,
      chairTest: [...chair],
      solved: [...Array(40)]
    });
  }

  componentDidUpdate() {
    console.log(this.state.wall);
    console.log(this.state.wallTest);
    console.log(this.state.solved);
  }

  //   this.setState({
  //     wallTest: [...this.state.wall],
  //     // chairTest: [...chair],
  //   }, () => {
  //     console.log(this.state.wallTest);
  //   });
  // }

  plusWall = () => {
    const walllength = this.state.wall.length;
    let a = this.state.wall.concat();
    a.push({ img: `ny_30.jpg`, order: walllength, board: 'wall' });
    let b = this.state.wallTest.concat();
    b.push({
      img: `ny_30.jpg`,
      order: this.state.wallTest.length,
      board: 'wall'
    });
    console.log(a);
    this.setState({ wall: a });
    this.setState({ wallTest: b });
  };

  handleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) return;

    const pieceOrder = e.dataTransfer.getData('text');
    let pieceData = this.state.wallTest.find(p => p.order === +pieceOrder);
    if (!pieceData) {
      pieceData = this.state.chairTest.find(p => p.order === +pieceOrder);
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

  solvehandleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) return;

    const pieceOrder = e.dataTransfer.getData('text');
    let pieceData = this.state.wallTest.find(p => p.order === +pieceOrder);
    if (!pieceData) {
      pieceData = this.state.chairTest.find(p => p.order === +pieceOrder);
    }
    const origin = this.state[pieceData.board];

    if (targetName === pieceData.board) {
      target = origin;
    }

    origin[origin.indexOf(pieceData)] = undefined;
    target[index] = pieceData;
    pieceData.board = targetName;

    this.setState({ [targetName]: target });
  }

  handleDragStart(e, order) {
    const dt = e.dataTransfer;
    dt.setData('text/plain', order);
    dt.effectAllowed = 'move';
  }

  render() {
    return (
      <div className="jigsaw">
        <button onClick={this.plusWall}>벽추가</button>
        <ul className="jigsaw__wall-board">
          {this.state.wall.map((piece, i) =>
            this.renderPieceContainer(piece, i, 'wall')
          )}
        </ul>
        <ul className="jigsaw__chair-board">
          {this.state.chair.map((piece, i) =>
            this.renderPieceContainer(piece, i, 'chair')
          )}
        </ul>
        <ol
          className="jigsaw__solved-board"
          style={{ backgroundImage: `url(${originalImage})` }}
        >
          {this.state.solved.map((piece, i) =>
            this.renderPieceContainer(piece, i, 'solved')
          )}
        </ol>
      </div>
    );
  }

  renderPieceContainer(piece, index, boardName) {
    if (boardName === 'solved') {
      return (
        <li
          key={index}
          onDragOver={e => e.preventDefault()}
          onDrop={e => this.handleDrop(e, index, boardName)}
          onDoubleClick={e => {
            if (e.currentTarget.childNodes[0]) {
              e.currentTarget.childNodes[0].remove();
            }
          }}
        >
          {piece && (
            <img
              draggable
              onDragStart={e => this.handleDragStart(e, piece.order)}
              src={require(`./images/${piece.img}`)}
            />
          )}
        </li>
      );
    } else {
      return (
        <li key={index}>
          {piece && (
            <img
              draggable
              onDragStart={e => this.handleDragStart(e, piece.order)}
              src={require(`./images/${piece.img}`)}
            />
          )}
        </li>
      );
    }
  }
}

ReactDOM.render(<Jigsaw />, document.getElementById('root'));
