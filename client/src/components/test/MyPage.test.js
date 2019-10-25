import React from 'react';
import { configure, mount } from 'enzyme';
import MyPage from '../MyPage';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('renders without crashing', () => {
  let order = [];
  let tocken =
    '?eyJhbGciOiJIUzI1NiJ9.MkAy.d_qbeutN2iXsAY6uMXHYd7ea-UkW-1ED8qK_ANae9NU';
  let wrapper = mount(<MyPage tocken={tocken} order={order} />);

  it('If not have a seat number and order, must return the following text', () => {
    expect(wrapper.find('div[className="loading"]').text()).toEqual('잠시만 기다려주세요');
  });
});
describe('return order history data', () => {
  let tocken =
    '?eyJhbGciOiJIUzI1NiJ9.MkAy.d_qbeutN2iXsAY6uMXHYd7ea-UkW-1ED8qK_ANae9NU';
  let wrapper = mount(<MyPage tocken={tocken} />);
  wrapper.setState({
    myData: {
      admin: false,
      order_history: [
        {
          order_time: '2019-10-21T17:40:15.067Z',
          menu: [
            {
              _id: '5daded7f4a31ed1d36dde018',
              id: '5da81701e4b6d10bddb3c41e',
              name: 'greenTea',
              price: 5000,
              count: 2
            },
            {
              _id: '5daded7f4a31ed1d36dde017',
              id: '5da9642b2db8170dc2ff035f',
              name: '리얼 초코',
              price: 30000,
              count: 3
            }
          ],
          _id: '5daded7f4a31ed1d36dde016'
        }
      ]
    }
  });
  it('menu', () => {
    expect(wrapper.find('tbody > tr > td').map(node => node.text())).toEqual([
      '19-10-21 / 17:40',
      'greenTea / 2개리얼 초코 / 3개',
      '100000₩'
    ]);
  });
});
