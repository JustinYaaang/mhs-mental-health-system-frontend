import React from 'react'
import { shallow } from 'enzyme'
import TrustDetails from '../layouts/Trusts/TrustDetails'
import TrustList from '../layouts/Trusts/TrustList'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('TrustDetails', () => {
  it('should render correctly', async () => {
     const component = shallow(<TrustDetails />)

     expect(component).toMatchSnapshot()
  })
})
describe('TrustList', () => {
    it('should render correctly', async () => {
       const component = shallow(<TrustList />)
  
       expect(component).toMatchSnapshot()
    })
  })
