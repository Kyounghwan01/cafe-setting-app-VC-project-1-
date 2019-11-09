import React from 'react';
import { configure, mount } from 'enzyme';
import ShoppingCart from '../ShoppingCart';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('renders without crashing', () => {
  let order = [];
  let tocken =
    '?eyJhbGciOiJIUzI1NiJ9.MkAy.d_qbeutN2iXsAY6uMXHYd7ea-UkW-1ED8qK_ANae9NU';
  let wrapper;
  wrapper = mount(<ShoppingCart tocken={tocken} order={order} />);

  it('If not have a seat number and order, must return the following text', () => {
    expect(wrapper.find('tbody > td').text()).toEqual('메뉴를 선택해 주세요');
    expect(wrapper.find('span').map(node => node.text())[0]).toEqual(
      '자리선택해주세요'
    );
  });
});

describe('renders without crashing', () => {
  let orderWithMenu = [
    { id: 'szrdthfn', name: '리얼 초코', price: 100, count: '1' },
    { id: 'szrdaesrthfn', name: '아이스 아메리카노', price: 1100, count: '2' }
  ];
  let seatNumber = '25';
  let tocken =
    '?eyJhbGciOiJIUzI1NiJ9.MkAy.d_qbeutN2iXsAY6uMXHYd7ea-UkW-1ED8qK_ANae9NU';
  let wrapper;
  wrapper = mount(
    <ShoppingCart
      tocken={tocken}
      seatNumber={seatNumber}
      order={orderWithMenu}
    />
  );

  it('If not have a seat number and order, must return the following text', () => {
    expect(wrapper.find('tbody > tr > td').map(node => node.text())).toEqual([
      '리얼 초코',
      '100₩',
      '1',
      '100₩',
      '아이스 아메리카노',
      '1100₩',
      '2',
      '2200₩'
    ]);
    expect(wrapper.find('span').map(node => node.text())[0]).toEqual('25');
  });
  it('called button', () => {
    expect(wrapper.find('div[className="payment"]').text()).toEqual('결제');
    wrapper.instance().submitSeat = jest.fn();
    wrapper.instance().forceUpdate();

    wrapper.find('.payment').simulate('click');
    expect(wrapper.instance().submitSeat).toHaveBeenCalled();
  });
});
