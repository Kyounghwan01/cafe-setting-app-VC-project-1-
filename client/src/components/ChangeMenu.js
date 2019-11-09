import React, { Component } from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Footer from './Footer';
import '../assets/style/ChangeMenu.scss';
import MenuTree from '../components/MenuTree';

export default class ChangeMenu extends Component {

  render() {
    const url = `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/cafes/menu/new/${this.props.tocken.substring(1)}`;
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

ChangeMenu.propTypes={
  arrangeMent : PropTypes.array,
  category : PropTypes.array,
  headerElement : PropTypes.array.isRequired,
  listData : PropTypes.object,
  tocken : PropTypes.string.isRequired,
}