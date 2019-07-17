import React from 'react'
import { shallow } from 'enzyme'
import { baseUrl, backendURL, fetchQuestionnairesUrl, patientanswersUrl, authenticationUrl, questionnaireWithoutToken } from '../variables/general'

it('should return the list of questionnaires', () => {
  const nock = require('nock')

  const scope = nock(baseUrl + fetchQuestionnairesUrl)
    .get('/repos/atom/atom/license')
    .reply(200, {
      'message': 'SurveyJS questionnaires retrieved successfully',
      'data': [
        {
          '_id': '5d1a1d16d910160030d04979',
          'title': 'Triage To Refer',
          'description': 'This questionnaire triages and treats patients',
          'status': 'PUBLISHED'
        },
        {
          '_id': '5d1b3143cd1699002fd7b6cd',
          'title': 'Triage To Treat',
          'description': 'This questionnaire triages and treats patients',
          'status': 'DRAFT'
        },
        {
          '_id': '5d1b655ad01e83503e3a6e55',
          'title': 'Triage To Treat',
          'description': 'This questionnaire triages and treats patients',
          'status': 'PUBLISHED'
        },
        {
          '_id': '5d1c95a173589a0030d798af',
          'title': 'Test',
          'description': 'Test questionnaire',
          'status': 'DRAFT'
        }
      ]
    })

  // console.log(scope)
})
