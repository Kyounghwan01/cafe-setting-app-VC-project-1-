import React, { Component } from 'react';
import '../assets/style/View.scss';
import Header from './Header';
import Footer from './Footer';
import { TiShoppingCart } from 'react-icons/ti';
import axios from 'axios';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrange: [],
      menuList: [],
      userData : []
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
          arrange: res.data.cafeData[0].arrangemenet,
          menuList: res.data.cafeData[0].menu,
          userData: res.data.userData[0]
        });
      }
    };
    fetchTableData();
  }

  componentDidUpdate(){
    console.log(this.state.userData);
    //전체 배열안에 _id가 있으면 그거 지우고 다른걸로 바꾼다
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
        className="test"
        key={index}
        data-id={index}
        onClick={e => {
          this.choiceSeats(e);
        }}
      >
        {piece && <img alt="wall" type={piece.type} src={piece.img} />}
      </li>
    );
  }

  choiceSeats = e => {
    console.log(e.currentTarget);
  };

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

// const renderSeats = () => {
//   if (props.arrangeMent) {
//     return props.arrangeMent.map((el, index1) => {
//       return el.map((element, index2) => {
//         let markup = (
//           <FaSquare key={_.uniqueId()} size="50" color="black" data-set={[index1, index2]} />
//         );
//         let br = (
//           <>
//             <FaSquare key={_.uniqueId()} size="50" color="black" data-set={[index1, index2]} />
//             <br />
//           </>
//         );
//         // if(element === 0){
//         //   markup = <FaSquare size="24" color="black" data-set={[index1,index2]}/>;
//         //   br = <><FaSquare size="24" color="black" data-set={[index1,index2]}/><br /></>
//         // }
//         return index2 === el.length - 1 ? br : markup;
//       });
//     });
//   }
// };

//쇼핑카트는 우하단에 고정 쇼핑카트 누르면 내가 담은 메뉴 + 가격 총합, 최 하단 결제 버튼
//메뉴 담으면 어떤거 담았다고 얼랏창, dispatch 담기 state 넣기
//ui 자리선정 최상단
//아래로 매뉴 알리기

export default View;
