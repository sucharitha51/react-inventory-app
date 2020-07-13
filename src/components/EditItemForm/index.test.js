import { configure, shallow } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import EditItemForm from '../../components/EditItemForm'

configure({ adapter: new Adapter() })

let [setOpen, fetchAndSetData] = new Array(3).fill(jest.fn());
const props = { open: true, setOpen, info: { id: 12, name: 'Test item', serialNumber: '123T', price: 10 }, itemsList: {}, fetchAndSetData }
let wrapper
beforeEach(() => {
  wrapper = shallow(<EditItemForm {...props} />);
})

describe('Edit item form', () => {

  it('should render edit name filed with value', () => {
    expect(wrapper.find('input[name="editItemName"]').prop('value')).toEqual('Test item');
  })
  it('should render edit serial number filed with value', () => {
    expect(wrapper.find('input[name="editItemSerialNumber"]').prop('value')).toEqual('123T');
  })
  it('should render edit price filed with value', () => {
    expect(wrapper.find('input[name="editItemPrice"]').prop('value')).toEqual(10);
  })
  it('should render a edit form fields in the correct order with values', () => {
    expect(wrapper.find('input').at(0).prop('value')).toEqual(12);
    expect(wrapper.find('input').at(1).prop('value')).toEqual('Test item');
    expect(wrapper.find('input').at(2).prop('value')).toEqual('123T');
    expect(wrapper.find('input').at(3).prop('value')).toEqual(10);
  });

  it('should edit name field have value', () => {
    const name = wrapper.find('input[name="editItemName"]');
    name.simulate('change', { target: { name: 'editItemName', value: "Test Edit Name" } });
    expect(wrapper.find('input[name="editItemName"]').prop('value')).toEqual("Test Edit Name")
  });

  it('should edit serial number field have value', () => {
    const serialNumber = wrapper.find('input[name="editItemSerialNumber"]');
    serialNumber.simulate('change', { target: { name: 'editItemSerialNumber', value: "12345TestEdit" } });
    expect(wrapper.find('input[name="editItemSerialNumber"]').prop('value')).toEqual("12345TestEdit")
  });

  it('should edit price field have value', () => {
    const serialNumber = wrapper.find('input[name="editItemPrice"]');
    serialNumber.simulate('change', { target: { name: 'editItemPrice', value: 1000 } });
    expect(wrapper.find('input[name="editItemPrice"]').prop('value')).toEqual(1000)
  });

});