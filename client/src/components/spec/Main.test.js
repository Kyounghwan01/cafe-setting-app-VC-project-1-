import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Main from '../Main';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('renders without crashing', () => {
  let wrapper;
    wrapper = mount(
      <Main
      headerElement={['SIGN-IN','SIGN-UP']}
      seats={[...Array(100)]}
      leftSeat={0}
      userId={'123'}
      tocken='eyJhbGciOiJIUzI1NiJ9.MUAx.WQNWCmb4wGJuhLolkJnmNVylLdBCpAOFk9ob5ycMIqw'
      checkAdmin={true}
      orderList={[]}
    />
    );

  it('should have element', () => {
    expect(wrapper.exists('span')).toEqual(true);
    expect(wrapper.exists('div')).toEqual(true);
    expect(wrapper.exists('li')).toEqual(true);
    expect(wrapper.find('.main-container').length).toBe(1);
    expect(wrapper.find('.seat-list').length).toBe(100);
  });
})