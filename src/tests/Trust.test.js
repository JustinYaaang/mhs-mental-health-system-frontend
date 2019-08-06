import React from 'react'
import { shallow } from 'enzyme'
import TrustDetails from '../layouts/Trusts/TrustDetails'
import TrustList from '../layouts/Trusts/TrustList'
import TrustCreateManager from '../layouts/Trusts/TrustCreateManager'
import TrustCreateNew from '../layouts/Trusts/TrustCreateNew'
import TrustUserDetails from '../layouts/Trusts/TrustUserDetails'
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

  describe('Trust Create Manager', () => {
   it('should render correctly', async () => {
      const component = shallow(<TrustCreateManager />)
 
      expect(component).toMatchSnapshot()
   })
 })
 describe('Trust Create New', () => {
   it('should render correctly', async () => {
      const component = shallow(<TrustCreateNew />)
 
      expect(component).toMatchSnapshot()
   })
 })
 describe('Trust User Details', () => {
   it('should render correctly', async () => {
      const component = shallow(<TrustUserDetails />)
 
      expect(component).toMatchSnapshot()
   })
 })
