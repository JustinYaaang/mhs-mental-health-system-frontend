import React from 'react'
import { shallow,mount } from 'enzyme'
import UserProfile from '../views/UserProfile/UserProfile'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('User page', () => {
  it('should render correctly', async () => {
    const component = mount(<UserProfile />)

    expect(component).toMatchSnapshot()
  })
})


