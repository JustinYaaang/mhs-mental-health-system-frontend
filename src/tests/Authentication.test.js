import React from 'react'
import { shallow } from 'enzyme'
import Authentication from '../views/Login/Authentication'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('SurveyCreator', () => {
    it('should render correctly', async() => {
        const component = shallow( < Authentication / > )

        expect(component).toMatchSnapshot()
    })
})