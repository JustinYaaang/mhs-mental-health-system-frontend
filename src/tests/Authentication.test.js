import React from 'react'
import { shallow,mount } from 'enzyme'
import Authentication from '../layouts/LoginPage'
import { configure } from 'enzyme'
import LoginPage from '../layouts/LoginPage'
import Adapter from 'enzyme-adapter-react-16'
import { bindActionCreators } from 'redux'
import { connect,Provider } from 'react-redux'
configure({ adapter: new Adapter() })

describe('Login Page', () => {
  it('should render correctly', async () => {
    // const component = shallow(<Provider><LoginPage /></Provider>)

    // expect(component).toMatchSnapshot()
  })
})
