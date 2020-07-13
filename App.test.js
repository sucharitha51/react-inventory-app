import { configure, shallow } from 'enzyme'
import React from 'react'

import Adapter from 'enzyme-adapter-react-16'
import App from './src/App';
configure({ adapter: new Adapter() })

let wrapper

beforeEach(() => {
  wrapper = shallow(<App />)
})

describe('App  component', () => {

  it('App renders without crashing', () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it('App should match with snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
})