import React from 'react'
import { shallow, mount } from 'enzyme'
import Dashboard from '../views/Dashboard/Dashboard'
import Trust from '../views/Dashboard/TrustDashboard'
import Service from '../views/Dashboard/ServiceDashboard'
import Clinician from '../views/Dashboard/ClinicianDashboard'
import { baseUrl, backendURL, fetchQuestionnairesUrl, patientanswersUrl, authenticationUrl, questionnaireWithoutToken } from '../variables/general'
import TrustDashboard from 'views/Dashboard/TrustDashboard';
import ServiceDashboard from 'views/Dashboard/ServiceDashboard';
import ClinicianDashboard from 'views/Dashboard/ClinicianDashboard';

describe('Admin Dashboard', () => {
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

  it('should render correctly', async () => {
    const component = mount(<Dashboard />)

    expect(component).toMatchSnapshot()
  })
})


describe('Trust Dashboard', () => {
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

  it('should render correctly', async () => {
    const component = mount(<TrustDashboard />)

    expect(component).toMatchSnapshot()
  })
})


describe('Service Dashboard', () => {
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

  it('should render correctly', async () => {
    const component = mount(<ServiceDashboard />)

    expect(component).toMatchSnapshot()
  })
})



describe('Clinician Dashboard', () => {
  const nock = require('nock')

  nock(baseUrl + fetchQuestionnairesUrl)
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

  nock(baseUrl + patientanswersUrl)
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


  it('should render correctly', async () => {
    const component = mount(<ClinicianDashboard state={{ value: 0, totalQuestionnaire: 0, totalPending: 0, totalClose: 0 }} />)
    component.update()
    expect(component).toMatchSnapshot()
  })
})