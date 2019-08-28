import React from 'react'
import { shallow, mount } from 'enzyme'
import ClinitianForm from '../views/Forms/ClinitianForm'
import PersonForm from '../views/Forms/PersonForm'
import TrustServiceForm from '../views/Forms/TrustServiceForm'
import UserDetail from '../views/Forms/UserDetail'
import SideQuestion from '../views/Forms/SideQuestion'
import SideQuestionAdmin from '../views/Forms/SideQuestionAdmin'
import SurveyResult from '../views/Forms/SurveyResult'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import QuestionnaireResult from 'views/Forms/QuestionnaireResult'
import QuestionnaireAdmin from 'views/Questionnaire/QuestionnaireAdmin'
configure({ adapter: new Adapter() })

describe('Clinitian Form', () => {
  it('should render correctly', async () => {
    const component = mount(<ClinitianForm />)

    expect(component).toMatchSnapshot()
  })
})
describe('Person Form', () => {
  it('should render correctly', async () => {
    const component = mount(<PersonForm />)

    expect(component).toMatchSnapshot()
  })
})

describe('Trust and Service Form', () => {
  it('should render correctly', async () => {
    const component = mount(<TrustServiceForm hasDetails={true} />)

    expect(component).toMatchSnapshot()
  })
})
describe('User details', () => {
  it('should render correctly', async () => {
    const component = mount(<UserDetail />)

    expect(component).toMatchSnapshot()
  })
})

describe('Side Question', () => {
  it('should render correctly', async () => {
    const component = mount(<SideQuestion />)

    expect(component).toMatchSnapshot()
  })
})
describe('Side Question Admin', () => {
  it('should render correctly', async () => {
    const component = mount(<SideQuestionAdmin />)

    expect(component).toMatchSnapshot()
  })
})
// describe('Survey Result', () => {
//   it('should render correctly', async () => {
//     const component = swallow(<SurveyResult />)

//     expect(component).toMatchSnapshot()
//   })
// })

describe('Questionnaire Result', () => {
  it('should render correctly', async () => {
    const component = mount(<QuestionnaireResult id="null" />)

    expect(component).toMatchSnapshot()
  })
})


describe('Questionnaire Admin', () => {
  it('should render correctly', async () => {
    const component = mount(<QuestionnaireAdmin />)

    expect(component).toMatchSnapshot()
  })
})