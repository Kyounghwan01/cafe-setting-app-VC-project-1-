import React, { Component } from 'react';
import '../assets/style/View.scss';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { FaSquare } from 'react-icons/fa';
import uniqueId from 'lodash/uniqueId';
import '../assets/style/Drag.scss';
import originalImage from '../images/ny_original.jpg';

class ChangeSeats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wall: [],
      wallTest: [],
      chair: [],
      chairTest: [],
      solved: []
    };
  }

  componentDidMount() {
    const wall = [Array(1)].map((_, i) => ({
      img: `ny_30.jpg`,
      order: 0,
      board: 'wall',
      type: 'wall'
    }));
    const chair = [Array(1)].map((_, i) => ({
      img: `ny_10.jpg`,
      order: 1,
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
              let a = e.currentTarget;
              console.log(a.getAttribute('data-id'));
              // e.currentTarget.childNodes[0].remove();
              // let current = 
              console.log(e.currentTarget.parentNode);
              let changeSeat = this.state.solved.concat();
              changeSeat[a.getAttribute('data-id')] = null;
              
              this.setState({solved : changeSeat})
            }
          }}
        >
          {piece && (
            <img
              draggable
              onDragStart={e => this.handleDragStart(e, piece.order)}
              src={require(`../images/${piece.img}`)}
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
              type={boardName}
              src={require(`../images/${piece.img}`)}
            />
          )}
        </li>
      );
    }
  }

  render() {
    return (
      <div className="jigsaw">
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
          style={{ backgroundColor: 'grey' }}
        >
          {this.state.solved.map((piece, i) =>
            this.renderPieceContainer(piece, i, 'solved')
          )}
        </ol>
      </div>
    );
  }
}

// const ChangeSeats = props => {
//   const renderSeats = () => {
//     if (props.arrangeMent) {
//       return props.arrangeMent.map((el, index1) => {
//         return el.map((element, index2) => {
//           let markup = (
//             <FaSquare size="50" color="black" data-set={[index1, index2]} />
//           );
//           let br = (
//             <>
//               <FaSquare size="50" color="black" data-set={[index1, index2]} />
//               <br />
//             </>
//           );
//           // if(element === 0){
//           //   markup = <FaSquare size="24" color="black" data-set={[index1,index2]}/>;
//           //   br = <><FaSquare size="24" color="black" data-set={[index1,index2]}/><br /></>
//           // }
//           return index2 === el.length - 1 ? br : markup;
//         });
//       });
//     }
//   };

//   return (
//     <div>
//       <Header
//         element={props.headerElement}
//         tocken={props.tocken}
//       />

//       <div>{renderSeats()}</div>
//       <Footer />
//     </div>
//   );
// };
export default ChangeSeats;
