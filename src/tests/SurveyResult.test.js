import React from 'react'
import { shallow } from 'enzyme'
import SurveyCreator from '../layouts/SurveyCreator'
import * as SurveyJSCreator from 'survey-creator'
import * as Survey from 'survey-react'
import { baseUrl, backendURL, fetchQuestionnairesUrl, patientanswersUrl, authenticationUrl, questionnaireWithoutToken } from '../variables/general'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('SurveyCreator', () => {
  const nock = require('nock')

  const scope = nock(baseUrl + patientanswersUrl)
    .get('/5d249893a2a1c700307a85af')
    .reply(200, {
      'message': 'SurveyJS questionnaires retrieved successfully',
      'data': [
        {
          'message': 'PatientAnswer details loading..',
          'data': {
            '_id': '5d2f3f2a820884002fbabb41',
            'questionnaire_id': '5d2f3dfd820884002fbabb40',
            'title': 'Test 3',
            'patient_name': 'Justin',
            'patiend_id': '5d135b30865a25190df56838',
            'borough_id': '5d25f534be2577372b6bc430',
            'score': '15',
            'body': '{"question1":"item3"}',
            'questionnaireBody': '{"title":"Test 3","description":"Test Questionnaire 3","pages":[{"name":"page1","elements":[{"type":"radiogroup","name":"question1","choices":["item1","item2","item3"]}]}]}',
            'createdAt': '2019-07-09T13:37:23.279Z',
            'updatedAt': '2019-07-09T13:37:23.279Z',
            '__v': 0
          }
        }
      ]
    })

  it('should render correctly', async () => {
    const component = shallow(<SurveyCreator match={{ params: { id: '5d2f3f2a820884002fbabb41' }, isExact: true, path: '', url: '' }} />)

    expect(component).toMatchSnapshot()
  })
})
