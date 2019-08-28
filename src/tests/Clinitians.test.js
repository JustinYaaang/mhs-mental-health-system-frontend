import React from 'react'
import { shallow, mount } from 'enzyme'
import ClinicianDetails from '../layouts/Clinicians/ClinicianDetails'
import ClinicianList from '../layouts/Clinicians/ClinicianList'
import CreateClinician from '../layouts/Clinicians/CreateClinician'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Clinitian Details', () => {
  it('should render correctly', async () => {
    const component = mount(<ClinicianDetails />)

    expect(component).toMatchSnapshot()
  })
})
describe('Clincian List', () => {
  it('should render correctly', async () => {
    const component = mount(<ClinicianList />)

    expect(component).toMatchSnapshot()
  })
})

describe('Create Clinician', () => {
  it('should render correctly', async () => {
    const component = mount(<CreateClinician />)

    expect(component).toMatchSnapshot()
  })
})

