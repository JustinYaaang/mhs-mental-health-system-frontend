import React, { Component } from "react";
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-react";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import Swal from 'sweetalert2';
import "icheck/skins/square/blue.css";


import { postNewSurvey } from "../components/BackendService/BackendService";
import { fetchQuestionnaire } from "../components/BackendService/BackendService";
import Button from "components/CustomButtons/Button.jsx";
import Hidden from "@material-ui/core/Hidden";
import Dashboard from "@material-ui/icons/Dashboard";

var mainColor = "#005EB8";
var mainHoverColor = "#003087";
var textColor = "#4a4a4a";
var headerColor = "#005EB8";
var headerBackgroundColor = "#4a4a4a";
var bodyContainerBackgroundColor = "#E8EDEE";

var defaultThemeColorsSurvey = Survey.StylesManager.ThemeColors["default"];
defaultThemeColorsSurvey["$main-color"] = mainColor;
defaultThemeColorsSurvey["$main-hover-color"] = mainHoverColor;
defaultThemeColorsSurvey["$text-color"] = textColor;
defaultThemeColorsSurvey["$header-color"] = headerColor;
defaultThemeColorsSurvey["$header-background-color"] = headerBackgroundColor;
defaultThemeColorsSurvey["$body-container-background-color"] = bodyContainerBackgroundColor;
Survey.StylesManager.applyTheme();

var defaultThemeColorsEditor = SurveyJSCreator.StylesManager.ThemeColors["default"];
defaultThemeColorsEditor["$primary-color"] = mainColor;
defaultThemeColorsEditor["$secondary-color"] = mainColor;
defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
defaultThemeColorsEditor["$primary-text-color"] = textColor;
defaultThemeColorsEditor["$selection-border-color"] = mainColor;
SurveyJSCreator.StylesManager.applyTheme();

class SurveyCreator extends Component {
  surveyCreator;

  state = {
    questionnaireId: '',
    questionnaireBody: ''
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    // console.log("id: " + id);
    if (id !== undefined) {
      fetchQuestionnaire(id).then(
        response => {
          console.log(response);
          this.setState({ questionnaireId: response.id, questionnaireBody: response.body });
          this.surveyCreator.text = this.state.questionnaireBody;
        }
      );
    }
  }

  componentDidMount() {
    let options = {
      showEmbededSurveyTab: true,
      showJSONEditorTab: true,
      showTestSurveyTab: true,
      // questionTypes: ["text", "checkbox", "radiogroup", "dropdown", "boolean", "comment", "text"],

    };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
  }

  handleDashboard = () => {
    document.location.href = "/admin/dashboard/";
  };

  render() {
    
    return(
      <div>
        <Button round color="info" onClick={this.handleDashboard}><Dashboard />Dashboard</Button>
        <Button justIcon round color="info" onClick={this.handleDashboard}><Dashboard /></Button>
        <div id="surveyCreatorContainer"></div>
    </div>);
  }

  saveMySurvey = () => {
    var jsonString = JSON.stringify(this.surveyCreator.text);

    jsonString = jsonString.replace('\n', '');
    var survey_jsonRepresentation = JSON.parse(this.surveyCreator.text);
    console.log(survey_jsonRepresentation);

    var survey_StringRepresentation=JSON.stringify(survey_jsonRepresentation);
    if (survey_jsonRepresentation.title && survey_jsonRepresentation.description){ //justing TODO remove this 
      console.log("surveyJson");


      // console.log(this.surveyCreator.text);
      // var createSurveyUrl = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS"
      //   postNewSurvey(createSurveyUrl, surveyJson)
      //     .then(results => {
      //       console.log(results)

      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });
      var surveyJson = {"title": survey_jsonRepresentation.title,
                        "description": survey_jsonRepresentation.description,
                        "status": "DRAFT",
                        "body":survey_StringRepresentation 
                       }
      console.log(this.surveyCreator.text);
      var createSurveyUrl = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS"
        postNewSurvey(createSurveyUrl, surveyJson)
          .then(results => {
            console.log(results)
            {document.location.href = '/admin/dashboard/'}
          })
          .catch(error => {
            console.error(error);
          });

          Swal.fire({
            type: 'success',
            title: 'Saved',
            showConfirmButton: false,
            timer: 1500
          })

          

    }
    else {
      Swal.fire({
        type: 'error',
        text: 'Something went wrong!',
        footer: 'Please define the title and description for this questionnaire in Survey Settings.</a>'
      })
    }
  };
}

export default SurveyCreator;
