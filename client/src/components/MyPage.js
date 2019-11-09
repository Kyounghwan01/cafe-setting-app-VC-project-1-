import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import * as PAGE from '../constants/state';
import '../assets/style/MyPage.scss';
import axios from 'axios';

export default class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: null
    };
  }
  componentDidMount() {
    const fetchData = async () => {
      const res = await axios.get(
        `http://itsmyseatvcserver-env.drc3wmhbci.ap-northeast-2.elasticbeanstalk.com/api/view/${window.location.href.slice(29)}`
      );
      this.setState({ myData: res.data.userData[0] });
    };
    fetchData();
  }

  render() {
    return (
      <div>
        {this.state.myData ? (
          this.state.myData.admin ? (
            <Header
              element={[
                PAGE.ROUTE_MAIN,
                PAGE.ROUTE_CHANGE_MENU,
                PAGE.ROUTE_CHANGE_SEATS,
                PAGE.ROUTE_LOG_OUT
              ]}
              tocken={window.location.href.slice(28)}
            />
          ) : (
            <Header
              element={[PAGE.ROUTE_MAIN, PAGE.ROUTE_ORDER, PAGE.ROUTE_LOG_OUT]}
              tocken={window.location.href.slice(28)}
            />
          )
        ) : (
          <Header
            element={[PAGE.ROUTE_MAIN, PAGE.ROUTE_ORDER, PAGE.ROUTE_LOG_OUT]}
            tocken={window.location.href.slice(28)}
          />
        )}
        <div className="my-page-container">
          <div className="my-page-desc">
            <span>주문 목록</span>
          </div>
          {this.state.myData ? (
            <div className="my-page-content">
              <table>
                <thead>
                  <tr>
                    <td>주 문 일</td>
                    <td>상 품 정보</td>
                    <td>총 금 액</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.myData.order_history.reverse().map((el, index) => {
                    let totalPrice = 0;
                    return (
                      <tr key={index}>
                        <td>
                          {el.order_time.slice(2, 10)} /{' '}
                          {el.order_time.slice(11, 16)}
                        </td>
                        <td>
                          {el.menu.map((menu, index) => {
                            totalPrice = totalPrice + menu.count * menu.price;
                            return (
                              <li key={index}>
                                <span>{menu.name} / {menu.count}개</span>
                              </li>
                            );
                          })}
                        </td>
                        <td>{totalPrice}₩</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='loading'>
              <span>잠시만 기다려주세요</span>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
