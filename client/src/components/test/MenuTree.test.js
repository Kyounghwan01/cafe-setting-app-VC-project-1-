import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import MenuTree from '../MenuTree';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('renders without crashing', () => {
  let node = {
    label: 'MENU',
    state: 'open',
    children: [
      {
        label: 'cake',
        children: [
          {
            label: 'greenTea',
            price: 5000,
            id: '5da81701e4b6d10bddb3c41e',
            desc: '맛좋은 뭐시기'
          }
        ]
      }
    ]
  };
  let tocken =
    '?eyJhbGciOiJIUzI1NiJ9.MkAy.d_qbeutN2iXsAY6uMXHYd7ea-UkW-1ED8qK_ANae9NU';


  let wrapper;
  wrapper = mount(<MenuTree tocken={tocken} node={node} />);
  //const spy = jest.spyOn(wrapper.instance(), 'deleteMenu');

  // let deleteMenu = jest.fn();
  // deleteMenu.mockReturnValueOnce(new Promise((res, rej) => res()));
  // wrapper.instance().deleteMenu = deleteMenu;



  it('should have element', async () => {
    expect(wrapper.exists('span')).toEqual(true);
    expect(wrapper.exists('div')).toEqual(true);
    expect(wrapper.exists('li')).toEqual(true);
    expect(wrapper.find('span[className="name"]').length).toBe(3);
    expect(wrapper.find('p[className="price"]').text()).toBe('가격 : 5000원');
    expect(wrapper.find('div[className="delete"]').length).toBe(1);
    expect(wrapper.find('div[className="modify-cancel"]').length).toBe(1);
    const text = wrapper
      .find('span[className="name"]')
      .map(node => node.text());
    expect(text).toEqual(['MENU', 'cake', 'greenTea']);

    expect(wrapper.find('div[className="delete"]').length).toBe(1);
    let deleteMenu = jest.fn();
  deleteMenu.mockReturnValueOnce(new Promise((res, rej) => res()));
  wrapper.instance().deleteMenu = deleteMenu;
    
    wrapper.find('div[className="delete"]').simulate('click');
    await expect( wrapper.instance().deleteMenu).toHaveBeenCalled();

    //console.log(wrapper.debug());
  });
});
