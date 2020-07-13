import { configure, shallow } from 'enzyme'
import React from 'react'

import Adapter from 'enzyme-adapter-react-16'
import Item from './index';
configure({ adapter: new Adapter() })

let wrapper
let fetchAndSetData = jest.fn();
let props = { info: { id: 5, name: 'Test Item Two', serialNumber: 'Test2345', price: '50.99' }, itemsList: {}, fetchAndSetData }

beforeEach(() => {
  wrapper = shallow(<Item {...props} />)
})

describe('should render the item', () => {
  it('should have a div with class name `item`', () => {
    expect(wrapper.hasClass('item')).toEqual(true);
  })

  it('should have two items when passed props', () => {
    expect(wrapper.find('p').length).toBe(4);
    expect(wrapper.find('.name').text()).toEqual('Test Item Two');
  })

  it('should name value match with props', () => {
    expect(wrapper.find('.name').text()).toEqual('Test Item Two');
  })

  it('should serial number value match with props', () => {
    expect(wrapper.find('.serialNumber').text()).toEqual('Test2345');
  })

  it('should price value match with props', () => {
    expect(wrapper.find('.price').text()).toEqual('£50.99');
  })
})