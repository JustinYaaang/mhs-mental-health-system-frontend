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

import swal from "sweetalert";

import "icheck/skins/square/blue.css";

import {postNewSurvey, updateSurvey, fetchQuestionnaire} from "services/BackendService";
import Button from "components/CustomButtons/Button.jsx";
import Hidden from "@material-ui/core/Hidden";
import Dashboard from "@material-ui/icons/Dashboard";
import { baseUrl, fetchQuestionnairesUrl } from "../variables/general";

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

  checkStatus = (survey_StringRepresentation,survey_jsonRepresentation,status) => {

      const { id } = this.props.match.params;
   
      swal("Saved Successfully!");
      var surveyJson = {
          "id": id,
          "title": survey_jsonRepresentation.title,
          "description": survey_jsonRepresentation.description,
          "status": status,
          "body":survey_StringRepresentation 
      }
                
      
      var createSurveyUrl = baseUrl + fetchQuestionnairesUrl

      if(id == undefined){
          postNewSurvey(createSurveyUrl, surveyJson)
          .then(results => {
              console.log(results)
              {document.location.href = '/admin/dashboard/'}
          })
          .catch(error => {
              console.error(error);
          });
      }else{
          createSurveyUrl = createSurveyUrl + '/' + id
          updateSurvey(createSurveyUrl,surveyJson)
          .then(results => {
            console.log(results)
            {document.location.href = '/admin/dashboard/'}
          })
          .catch(error => {
              console.error(error);
          });
      }
      
}

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
    

    var survey_StringRepresentation=JSON.stringify(survey_jsonRepresentation);

    if (survey_jsonRepresentation.title && survey_jsonRepresentation.description){ //ju
          swal("Select your choice", {
            buttons: {
              cancel: "Cancel",
              Save: true,
              catch: {
                text: "Publish!",
                value: "catch",
              },
            },
          })
          .then((value) => {
            switch (value) {
           
              case "Save":
                this.checkStatus(survey_StringRepresentation,survey_jsonRepresentation,"DRAFT");
                break;
           
              case "catch":
                this.checkStatus(survey_StringRepresentation,survey_jsonRepresentation,"PUBLISHED")
                break;
           
              default:
    
            }
          });
    }
    else {
        swal("Error!", "Enter Title and Description in settings!", "warning");
    }
  };
}

export default SurveyCreator;
