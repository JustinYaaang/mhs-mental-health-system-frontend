import React from 'react';
import { shallow } from 'enzyme';
import SurveyCreator from '../layouts/SurveyCreator';
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-react"

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe('SurveyCreator', () => {
  it('should render correctly', () => {
    const component = shallow(<SurveyCreator  match={{params: {id: "5d249893a2a1c700307a85af"}, isExact: true, path: "", url: ""}}/>);
  
    expect(component).toMatchSnapshot();
  });
});