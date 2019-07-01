import React, { Component } from "react";
import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import * as Survey from "survey-react";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "icheck/skins/square/blue.css";

import * as widgets from "surveyjs-widgets";
import postNewSurvey from "../components/BackendService/BackendService";

// SurveyJSCreator.StylesManager.applyTheme("default");

// widgets.icheck(SurveyKo, $);
// widgets.select2(SurveyKo, $);
// widgets.inputmask(SurveyKo);
// widgets.jquerybarrating(SurveyKo, $);
// widgets.jqueryuidatepicker(SurveyKo, $);
// widgets.nouislider(SurveyKo);
// widgets.select2tagbox(SurveyKo, $);
// widgets.signaturepad(SurveyKo);
// widgets.sortablejs(SurveyKo);
// widgets.ckeditor(SurveyKo);
// widgets.autocomplete(SurveyKo, $);
// widgets.bootstrapslider(SurveyKo);

var mainColor = "#005EB8";
var mainHoverColor = "#003087";
var textColor = "#4a4a4a";
var headerColor = "#005EB8";
var headerBackgroundColor = "#4a4a4a";
var bodyContainerBackgroundColor = "#E8EDEE";

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

var defaultThemeColorsEditor = SurveyJSCreator
    .StylesManager
    .ThemeColors["default"];
defaultThemeColorsEditor["$primary-color"] = mainColor;
defaultThemeColorsEditor["$secondary-color"] = mainColor;
defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
defaultThemeColorsEditor["$primary-text-color"] = textColor;
defaultThemeColorsEditor["$selection-border-color"] = mainColor;

Survey.StylesManager.applyTheme();

SurveyJSCreator
    .StylesManager
    .applyTheme();

class SurveyCreator extends Component {
  surveyCreator;
  componentDidMount() {
    let options = { 
      showEmbededSurveyTab: true ,
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
  render() {
    return <div id="surveyCreatorContainer" />;
  }
  saveMySurvey = () => {
    var jsonString = JSON.stringify(this.surveyCreator.text);
    
    jsonString = jsonString.replace('\n', '');
    console.log(jsonString);
    var jsonBody = JSON.parse(this.surveyCreator.text);
                // console.log("surveyJson1");


    // console.log("!!!!!!!!!"+this.surveyCreator.text);
    // if (jsonBody.title && jsonBody.description){
    if (true){
            // console.log("surveyJson");

      var surveyJson = {"title": "DUMMY",
                        "description": "DUMMY",
                        "status": "draft",
                        "body": "jsonBody"
                       }

      // console.log(this.surveyCreator.text);
      // var createSurveyUrl = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS"
      //   postNewSurvey(createSurveyUrl, surveyJson)
      //     .then(results => {
      //       console.log(results)

      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });

    }
    else{
      alert("Please define the title and description for this questionnaire in Survey Settings.");
    }
    

  };
}

export default SurveyCreator;