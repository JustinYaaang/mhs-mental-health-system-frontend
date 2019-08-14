import React from 'react'
import { shallow } from 'enzyme'
import ClinitianForm from '../views/Forms/ClinitianForm'
import PersonForm from '../views/Forms/PersonForm'
import TrustServiceForm from '../views/Forms/TrustServiceForm'
import UserDetail from '../views/Forms/UserDetail'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Clinitian Form', () => {
  it('should render correctly', async () => {
    const component = shallow(<ClinitianForm />)

    expect(component).toMatchSnapshot()
  })
})
describe('Person Form', () => {
  it('should render correctly', async () => {
    const component = shallow(<PersonForm />)

    expect(component).toMatchSnapshot()
  })
})

describe('Trust and Service Form', () => {
  it('should render correctly', async () => {
    const component = shallow(<TrustServiceForm hasDetails={true} />)

    expect(component).toMatchSnapshot()
  })
})
describe('User details', () => {
  it('should render correctly', async () => {
    const component = shallow(<UserDetail />)

    expect(component).toMatchSnapshot()
  })
})
