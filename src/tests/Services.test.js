import React from 'react'
import { shallow,mount } from 'enzyme'
import ServiceDetails from '../layouts/Services/ServiceDetails'
import ServiceList from '../layouts/Services/ServiceList'
import ServiceCreateManager from '../layouts/Services/ServiceCreateManager'
import ServiceCreateNew from '../layouts/Services/ServiceCreateNew'
import ServiceUserDetails from '../layouts/Services/ServiceUserDetails'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Service Details', () => {
  it('should render correctly', async () => {
    const component = mount(<ServiceDetails />)

    expect(component).toMatchSnapshot()
  })
})
describe('Service List', () => {
  it('should render correctly', async () => {
    const component = mount(<ServiceList />)

    expect(component).toMatchSnapshot()
  })
})

describe('Service Create Manager', () => {
  it('should render correctly', async () => {
    const component = mount(<ServiceCreateManager />)

    expect(component).toMatchSnapshot()
  })
})
describe('Service Create New', () => {
  it('should render correctly', async () => {
    const component = mount(<ServiceCreateNew />)

    expect(component).toMatchSnapshot()
  })
})
describe('Service User Details', () => {
  it('should render correctly', async () => {
    const component = mount(<ServiceUserDetails />)

    expect(component).toMatchSnapshot()
  })
})
