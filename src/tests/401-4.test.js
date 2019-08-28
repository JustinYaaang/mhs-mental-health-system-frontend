import React from 'react'
import { shallow } from 'enzyme'
import Error401 from '../layouts/401'
import Error404 from '../layouts/404'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('401', () => {
  it('should render correctly', () => {
    const component = shallow(<Error401 />)

    expect(component).toMatchSnapshot()
  })
})



describe('404', () => {
  it('should render correctly', () => {
    const component = shallow(<Error404 />)

    expect(component).toMatchSnapshot()
  })
})


