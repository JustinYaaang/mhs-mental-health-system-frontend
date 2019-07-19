import React from 'react'
import { shallow } from 'enzyme'
import InformationCard from '../components/DashboardComponent/InformationCard'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('SurveyCreator', () => {
  it('should render correctly', async () => {
    const component = shallow(
      <InformationCard
        color={'info'} title={'Total Questionnaires'} value={15}
        daterange={'Updated today'} classes={{
          cardCategory: 'Dashboard-cardCategory-251',
          cardCategoryWhite: 'Dashboard-cardCategoryWhite-252',
          cardTitle: 'Dashboard-cardTitle-253',
          cardTitleWhite: 'Dashboard-cardTitleWhite-254',
          stats: 'Dashboard-stats-250',
          successText: 'Dashboard-successText-248',
          upArrowCardCategory: 'Dashboard-upArrowCardCategory-249'

        }}
      />)

    expect(component).toMatchSnapshot()
  })
})
