import React from 'react'
import { shallow } from 'enzyme'
import UserProfile from '../views/UserProfile/UserProfile'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('User page', () => {
  it('should render correctly', async () => {
    const component = shallow(<UserProfile />)

    expect(component).toMatchSnapshot()
  })
})


