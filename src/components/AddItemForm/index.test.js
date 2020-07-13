import { configure, shallow } from 'enzyme'
import React from 'react'

import Adapter from 'enzyme-adapter-react-16'
import AddItemForm from './index';
import * as crud from '../../common/crud';
configure({ adapter: new Adapter() })

let [setOpenAddNewModal, fetchAndSetData, resetForm] = new Array(2).fill(jest.fn());

let wrapper
const props = { openAddNewModal: true, setOpenAddNewModal, itemsList: [], fetchAndSetData }

beforeEach(() => {
    wrapper = shallow(<AddItemForm {...props} />)
})

describe('Add item form', () => {

    it('should render a add item form', () => {
        expect(wrapper.find('input').at(0).props().defaultValue).toEqual(props.name);
        expect(wrapper.find('input').at(1).props().defaultValue).toEqual(props.serialNumber);
        expect(wrapper.find('input').at(2).props().defaultValue).toEqual(props.price);
    });

    let container = shallow(<AddItemForm />);
    it('should match the snapshot', () => {
        expect(container.html()).toMatchSnapshot();
    });

    it('should have a name field', () => {
        expect(wrapper.find('input[name="itemName"]').length).toEqual(1);
    });

    it('should have proper props for name field', () => {
        expect(wrapper.find('input[name="itemName"]').props()).toEqual({
            type: 'text',
            name: 'itemName',
            placeholder: 'Item Name',
            value: '',
            onChange: expect.anything(),
            required: true
        });
    });

    it('should have a serial number field', () => {
        expect(wrapper.find('input[name="itemSerialNumber"]').length).toEqual(1);
    });

    it('should have proper props for Serial Number field', () => {
        expect(wrapper.find('input[name="itemSerialNumber"]').props()).toEqual({
            type: 'text',
            name: 'itemSerialNumber',
            placeholder: 'Serial Number',
            value: '',
            onChange: expect.anything(),
            required: true
        });
    });

    it('should have a price field', () => {
        expect(wrapper.find('input[name="itemSerialNumber"]').length).toEqual(1);
    });

    it('should have proper props for Price field', () => {
        expect(wrapper.find('input[name="itemPrice"]').props()).toEqual({
            type: 'number',
            name: 'itemPrice',
            placeholder: 'Price',
            value: '',
            onChange: expect.anything(),
            required: true
        });
    });

    it('should name field have value', () => {
        const name = wrapper.find('input[name="itemName"]');
        name.simulate('change', { target: { name: 'itemName', value: "Test" } });
        expect(wrapper.find('input[name="itemName"]').prop('value')).toEqual("Test")
    });

    it('should serial number field have value', () => {
        const serialNumber = wrapper.find('input[name="itemSerialNumber"]');
        serialNumber.simulate('change', { target: { name: 'itemSerialNumber', value: "12345Test" } });
        expect(wrapper.find('input[name="itemSerialNumber"]').prop('value')).toEqual("12345Test")
    });

    it('should price field have value', () => {
        const itemPrice = wrapper.find('input[name="itemPrice"]');
        itemPrice.simulate('change', { target: { name: 'itemPrice', value: 100 } });
        expect(wrapper.find('input[name="itemPrice"]').prop('value')).toEqual(100)
    });

    it('should have a submit button', () => {
        expect(wrapper.find('button[type="submit"]').length).toEqual(1);
    });

    it('should have a cancel button', () => {
        expect(wrapper.find('button[type="reset"]').length).toEqual(1);
    });

    it('it should add a new item', () => {
        const fakeEvent = { preventDefault: () => console.log('preventDefault') };

        const name = wrapper.find('input[name="itemName"]');
        name.simulate('change', { target: { name: 'itemName', value: "Test" } });
        expect(wrapper.find('input[name="itemName"]').prop('value')).toEqual("Test")
  
        const serialNumber = wrapper.find('input[name="itemSerialNumber"]');
        serialNumber.simulate('change', { target: { name: 'itemSerialNumber', value: "12345Test" } });
        expect(wrapper.find('input[name="itemSerialNumber"]').prop('value')).toEqual("12345Test")

        const itemPrice = wrapper.find('input[name="itemPrice"]');
        itemPrice.simulate('change', { target: { name: 'itemPrice', value: 100 } });
        expect(wrapper.find('input[name="itemPrice"]').prop('value')).toEqual(100)

        expect(wrapper.find('form').length).toBe(1);
    
        jest.spyOn(crud, 'addItem').mockImplementation(() => Promise.resolve({message: "Item has been added"}))
  
        wrapper.find('form').simulate('submit', fakeEvent)

        expect(wrapper.find('input[name="itemName"]').prop('value')).toEqual("")  
      
        expect(crud.addItem).toHaveBeenCalledWith({id: 1, name: 'Test', price: 100, serialNumber: '12345Test'}, [])
        expect(fetchAndSetData).toHaveBeenCalled()
    });

});

