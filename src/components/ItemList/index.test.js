import { configure, shallow } from 'enzyme'
import React from 'react'

import Adapter from 'enzyme-adapter-react-16'
import ItemList from '../ItemList'
import Item from '../Item';
configure({ adapter: new Adapter() })

let fetchAndSetData = jest.fn();
const props = {
  itemsList: [
    {
      id: 1,
      name: 'Apple Mac Pro 17" Retina',
      serialNumber: 'IB12312421ABXW',
      price: 1895.45
    },
    {
      id: 2,
      name: 'iPhone X 128GB',
      serialNumber: 'AB87129TB1234',
      price: 922.99
    }
  ], fetchAndSetData
}

let wrapper

beforeEach(() => {
  wrapper = shallow(<ItemList  {...props} />)
})

describe('should render the item list', () => {
  it('should have a div with class name `items-list`', () => {
    expect(wrapper.hasClass('items-list')).toEqual(true);
  })

  it('should have two items when passed props', () => {
    expect(wrapper.find(Item).length).toEqual(2);
  })
})