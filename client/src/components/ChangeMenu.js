import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../assets/style/ChangeMenu.scss';
import axios from 'axios';
import * as constants from '../constants/state';
import MenuTree from '../components/MenuTree';

export default class ChangeMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url = `/api/cafes/menu/new/${this.props.tocken.substring(1)}`;
    return (
      <div>
        <Header element={this.props.headerElement} tocken={this.props.tocken} />
        <div className="change-menu-container">
          <div className="change">
            <div className="change-desc">
              <span>메뉴를 추가하시려면 오른쪽에서 작성 해주세요.</span>
              <br />
              <span>
                메뉴를 수정/삭제 하시려면 아래 카테고리의 왼쪽 아이콘을
                클릭해주세요.
              </span>
              <br />
              <span>가격의 100원 이하는 자동 내림 처리됩니다.</span>
            </div>
            <div className="menu-add-container">
              <form action={url} method="POST">
                <label>메뉴 추가</label>
                <div className="group">
                  <label>메뉴명</label>
                  <input
                    type="text"
                    required
                    name="name"
                    placeholder="메뉴명을 입력해주세요"
                  />
                </div>
                <div className="group">
                  <label>가격</label>
                  <input
                    type="number"
                    step="100"
                    required
                    name="price"
                    placeholder="가격을 100단위로 입력해주세요"
                  />
                </div>
                <div className="group">
                  <label>메뉴 설명</label>
                  <input
                    type="text"
                    name="desc"
                    placeholder="메뉴에 대한 설명을 적어주세요"
                  />
                </div>
                <div className="group">
                  <label>카테고리</label>
                  <input
                    type="text"
                    required
                    name="category"
                    placeholder="카테고리를 입력해주세요"
                  />
                </div>
                <input
                  className="menu-add-submit"
                  type="submit"
                  value="메뉴 생성"
                />
              </form>
            </div>
          </div>
          {this.props.listData && this.props.tocken ? (
            <div className="list-container">
              <MenuTree tocken={this.props.tocken} node={this.props.listData} />
            </div>
          ) : <div className='loading'><span>잠시만 기다려 주세요 ...</span></div>}
        </div>
        <Footer />
      </div>
    );
  }
}

// import React, { Component } from 'react';
// //import { Redirect } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
// import '../assets/style/ChangeMenu.scss';
// import axios from 'axios';
// //import * as constants from '../constants/state';
// import MenuTree from '../components/MenuTree';

// export default class ChangeMenu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       createModal: false
//     };
//     this.name = React.createRef();
//     this.price = React.createRef();
//     this.category = React.createRef();
//     this.img = React.createRef();
//   }
//   componentDidUpdate() {
//     console.log(this.props.category);
//   }

//   createMenu = async (e) => {
//     e.preventDefault();
//     const menuimage = new FormData();
//     menuimage.append("image", this.img.current.value);
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     }
//     console.log(menuimage)
//     await axios.post(`/api/cafes/menu/new/${this.props.tocken.substring(1)}`,{
//       name : this.name.current.value,
//       price : this.price.current.value,
//       category : this.category.current.value,
//       menuimage : menuimage
//     });
//     //새로고침
//     window.location.reload();
//   }

//   render() {
//     //const url = `/api/cafes/menu/new/${this.props.tocken.substring(1)}`;
//     return (
//       <div>
//         <Header element={this.props.headerElement} tocken={this.props.tocken} />
//         <div>
//           가격의 100원 이하는 자동 내림 처리됩니다.
//           {this.props.listData && this.props.tocken ? (
//             <div>
//               <button
//                 onClick={() => {
//                   if (this.state.createModal) {
//                     this.setState({ createModal: false });
//                   } else {
//                     this.setState({
//                       createModal: {
//                         name: null,
//                         price: null,
//                         category: null
//                       }
//                     });
//                   }
//                 }}
//               >
//                 {this.state.createModal ? '취소' : '추가'}
//               </button>
//               {this.state.createModal ? (
//                 <div>
//                   {/* <form action={url} method="POST"  */}
//                   <form onSubmit={(e)=>this.createMenu(e)} encType="multipart/form-data"
//                   //enctype="multipart/form-data"
//                   >
//                     <label>메뉴명</label>
//                     <input
//                       type="text"
//                       required
//                       autoFocus
//                       name="name"
//                       ref={this.name}
//                       placeholder="메뉴명을 입력해주세요"
//                     />
//                     <label>가격</label>
//                     <input
//                       type="number"
//                       step="100"
//                       required
//                       autoFocus
//                       name="price"
//                       ref={this.price}
//                       placeholder="가격을 100단위로 입력해주세요"
//                     />
//                     <label>카테고리</label>
//                     <input
//                       type="text"
//                       required
//                       autoFocus
//                       name="category"
//                       ref={this.category}
//                       placeholder="카테고리를 입력해주세요"
//                     />
//                     <label className='label-login' htmlFor="file">프로필 업로드</label>
//                     <input type='file' name='file' id="file" ref={this.img}/>
//                     <input type="submit"  value="생성" />
//                   </form>
//                 </div>
//               ) : null}
//               <MenuTree tocken={this.props.tocken} node={this.props.listData} />
//             </div>
//           ) : null}
//         </div>
//         <Footer />
//       </div>
//     );
//   }
// }
