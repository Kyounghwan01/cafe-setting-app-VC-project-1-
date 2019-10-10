
// import uniqueId from 'lodash/uniqueId';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Sortable from 'react-sortablejs';

// class App extends React.Component {
//     state = {
//         items: ['Apple', 'Banana', 'Cherry', 'Guava', 'Peach', 'Strawberry']
//     };

//     render() {
//         const items = this.state.items.map(val => (<li key={uniqueId()} data-id={val}>{val}</li>));

//         return (
//             <div>
//                 <Sortable
//                     tag="ul" // Defaults to "div"
//                 >
//                     {items}
//                 </Sortable>
//             </div>
//         );
//     }
// }

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import originalImage from './images/ny_original.jpg';
import './App.css';

class Jigsaw extends Component {
  state = {
    pieces: [],
    shuffled: [],
    solved: []
  };

  componentDidMount() {
    const pieces = [...Array(40)]
      .map((_, i) => (
        {
          img: `ny_${('0' + (i + 1)).substr(-2)}.jpg`,
          order: i,
          board: 'shuffled'
        }
      ));

    this.setState({
      pieces : pieces,
      shuffled: [...pieces],
      // this.shufflePieces(pieces),
      solved: [...Array(100)]
    });
  }

  handleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) return;

    const pieceOrder = e.dataTransfer.getData('text');
    const pieceData = this.state.pieces.find(p => p.order === +pieceOrder);
    const origin = this.state[pieceData.board];

    if (targetName === pieceData.board) target = origin;
    origin[origin.indexOf(pieceData)] = undefined;
    target[index] = pieceData;
    pieceData.board = targetName;

    this.setState({ [pieceData.board]: origin, [targetName]: target })
  }

  handleDragStart(e, order) {
    const dt = e.dataTransfer;
    dt.setData('text/plain', order);
    dt.effectAllowed = 'move';
  }

  render() {
    return (
      <div className="jigsaw">
        <ul className="jigsaw__shuffled-board">
          {this.state.shuffled.map((piece, i) => this.renderPieceContainer(piece, i, 'shuffled'))}
        </ul>
        <ol className="jigsaw__solved-board"
          style={{ backgroundImage: `url(${originalImage})` }}
        >
          {this.state.solved.map((piece, i) => this.renderPieceContainer(piece, i, 'solved'))}
        </ol>
      </div>
    );
  }

  renderPieceContainer(piece, index, boardName) {
    return (
      <li
        key={index}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => this.handleDrop(e, index, boardName)}>
        {
          piece && <img
            draggable
            onDragStart={(e) => this.handleDragStart(e, piece.order)}
            value={'wall'}
            src={require(`./images/${piece.img}`)} />
        }
      </li>
    );
  }

  shufflePieces(pieces) {
    const shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = tmp;
    }

    return shuffled;
  }
}


ReactDOM.render(<Jigsaw />, document.getElementById('root'));