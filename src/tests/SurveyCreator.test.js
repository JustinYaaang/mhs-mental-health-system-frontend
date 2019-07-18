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

  const scope = nock(baseUrl + fetchQuestionnairesUrl)
    .get('5d1b3143cd1699002fd7b6cd')
    .reply(200, {
      'message': 'SurveyJS questionnaires retrieved successfully',
      'data': [{
        'message': 'Questionnaire details loading..',
        'data': {
          '_id': '5d1b3143cd1699002fd7b6cd',
          'title': 'Triage To Treat',
          'description': 'This questionnaire triages and treats patients',
          'status': 'DRAFT',
          'body': '{"title":"Triage To Treat","description":"This questionnaire triages and treats patients","pages":[{"name":"Consent To Contact","elements":[{"type":"radiogroup","name":"question1","title":"By proceeding, you agree to provide your details, accept that your information will be stored and analysed by the NHS","isRequired":true,"choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]}],"title":"Consent To Contact"},{"name":"Health History","elements":[{"type":"radiogroup","name":"question2","title":"Are you receiving treatment?","isRequired":true,"choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]},{"type":"comment","name":"question3","title":"How did you hear about the service?","isRequired":true}],"title":"Health History"},{"name":"Personal Details","elements":[{"type":"text","name":"question4","title":"First Name","isRequired":true},{"type":"text","name":"question5","title":"Last Name","isRequired":true},{"type":"radiogroup","name":"question6","title":"Gender","isRequired":true,"choices":[{"value":"item1","text":"Female"},{"value":"item2","text":"Male"},{"value":"item3","text":"Prefer not to say"}]},{"type":"text","name":"question7","title":"Postcode","isRequired":true},{"type":"text","name":"question8","title":"Date of Birth","isRequired":true,"inputType":"date"}],"title":"Personal Details"},{"name":"Diagnostics","elements":[{"type":"radiogroup","name":"question10","title":"Little interest of pleasure in doing things?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question9","title":"Feeling down, depressed, or hopeless?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question11","title":"Trouble falling or staying asleep, or sleeping too much?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question12","title":"Feeling tired or having little energy?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question13","title":"Poor appetite or overeating?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question14","title":"Feeling bad about yourself or that you are a failure or have let yourself or your family down?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question15","title":"Trouble concentrating on things, such as reading the newspaper or watching television?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question16","title":"Moving or speaking so slowly that other people could have noticed or the opposite, being so fidgety or restless that you have been around a lot more than usual?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"},{"type":"radiogroup","name":"question17","title":"Thoughts that you would be better off dead, or of hurting yourself in some other way?","isRequired":true,"choices":[{"value":"0","text":"Not at all"},{"value":"1","text":"Several days"},{"value":"2","text":"More than half the days"},{"value":"3","text":"Nearly every day"}],"otherText":"Nearly every day"}],"title":"Diagnostics"},{"name":"Triggers","elements":[{"type":"comment","name":"question18","title":"Existing Conditions"},{"type":"comment","name":"question19","title":"Status in Family"},{"type":"comment","name":"question20","title":"Income Issues"},{"type":"comment","name":"question21","title":"Social Benefits"}],"title":"Triggers"},{"name":"Motivation","elements":[{"type":"comment","name":"question22","title":"What caused you to seek help?","isRequired":true},{"type":"comment","name":"question23","title":"What help do you believe you need?","isRequired":true}],"title":"Motivation"},{"name":"Demographics","elements":[{"type":"text","name":"question24","title":"Preferred Spoken Language","isRequired":true},{"type":"text","name":"question25","title":"Ethnicity","isRequired":true},{"type":"text","name":"question26","title":"Religion","isRequired":true},{"type":"text","name":"question27","title":"Disability Status","isRequired":true},{"type":"text","name":"question28","title":"Sexual Orientation","isRequired":true},{"type":"radiogroup","name":"question29","title":"If you do not wish to share this information, Please tick here","isRequired":true,"choices":[{"value":"item1","text":"Yes"},{"value":"item2","text":"No"}]}],"title":"Demographics","description":"To improve access to the service it would be helpful if you can provide demographic details"},{"name":"Confirmation","title":"Confirmation","description":"Thank you for your information, it will be sent to X. They will respond to the information you have shared by Y date."}]}',
          '__v': 0
        }
      }
      ]
    })

  it('should render correctly', async () => {
    const component = shallow(<SurveyCreator match={{ params: { id: '5d1b3143cd1699002fd7b6cd' }, isExact: true, path: '', url: '' }} />)

    expect(component).toMatchSnapshot()
  })
})
