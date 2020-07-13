import { configure, shallow } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import HomePage from './index';
import ItemList from '../../components/ItemList'
import AddItemForm from '../../components/AddItemForm'
import CsvDownload from 'react-json-to-csv'
configure({ adapter: new Adapter() })

let wrapper

beforeEach(() => {
  wrapper = shallow(<HomePage />)
})

describe('Home page component', () => {

  it('Home page div should exist', () => {
    expect(wrapper.find('div').length).toBe(1);
  });

  it('ItemList component should exist', () => {
    expect(wrapper.find(ItemList).length).toBe(1);
  });

  it('CSVDownload component should exist', () => {
    expect(wrapper.find(CsvDownload).length).toBe(1);
  });

  it('It should have `Add New Item` button ', () => {
    expect(wrapper.find('.add-new').text()).toBe('Add New Item');
  });

  it('open `Add New Item` button ', () => {
    wrapper.find('span').simulate('click');
    expect(wrapper.find(AddItemForm).length).toBe(1);
  });

});