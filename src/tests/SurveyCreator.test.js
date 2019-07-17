import React from 'react';
import { shallow } from 'enzyme';
import SurveyCreator from '../layouts/SurveyCreator';
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-react"

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


describe('SurveyCreator', () => {
  it('should render correctly',async () => {
    const component = shallow(<SurveyCreator  match={{params: {id: "5d1b3143cd1699002fd7b6cd"}, isExact: true, path: "", url: ""}}/>);
  
    expect(component).toMatchSnapshot();
  });
});