import React from 'react'
import { shallow } from 'enzyme'
import InformationCard from '../components/DashboardComponent/InformationCard'
import LineGraph from '../components/DashboardComponent/LineGraph'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Information Card', () => {
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

describe('Line Graph', () => {
  it('should render correctly', async () => {
    const component = shallow(
      <LineGraph color={"success"} dailySubmission={
            {labels:[
              0: "S",
              1: "S",
              2: "M",
              3: "T",
              4: "W",
              5: "T",
              6: "F"],
              series:[
              0: 0,
              1: 8,
              2: 14,
              3: 0,
              4: 0,
              5: 0,
              6: 0
              ]
              }}
              type={"Line"}
              dashboardData={{
                dailySalesChart:{
                  options:"",
                  animation:""
                }
              }}
          classes={{
            cardCategory: 'Dashboard-cardCategory-251',
            cardCategoryWhite: 'Dashboard-cardCategoryWhite-252',
            cardTitle: 'Dashboard-cardTitle-253',
            cardTitleWhite: 'Dashboard-cardTitleWhite-254',
            stats: 'Dashboard-stats-250',
            successText: 'Dashboard-successText-248',
            upArrowCardCategory: 'Dashboard-upArrowCardCategory-249'}} 
            ></LineGraph>

        )})})