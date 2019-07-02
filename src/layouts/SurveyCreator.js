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

import "icheck/skins/square/blue.css";


import {postNewSurvey} from "../components/BackendService/BackendService";


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

    const { id } = this.props.match.params;
    console.log("id: " + id);
    if (id !== undefined){
      this.surveyCreator.text = JSON.stringify({
        "title": "Triage To Treat",
        "description": "This questionnaire triages and treats patients",
        "pages": [
         {
          "name": "Consent To Contact",
          "elements": [
           {
            "type": "radiogroup",
            "name": "question1",
            "title": "By proceeding, you agree to provide your details, accept that your information will be stored and analysed by the NHS",
            "isRequired": true,
            "choices": [
             {
              "value": "item1",
              "text": "Yes"
             },
             {
              "value": "item2",
              "text": "No"
             }
            ]
           }
          ],
          "title": "Consent To Contact"
         },
         {
          "name": "Health History",
          "elements": [
           {
            "type": "radiogroup",
            "name": "question2",
            "title": "Are you receiving treatment?",
            "isRequired": true,
            "choices": [
             {
              "value": "item1",
              "text": "Yes"
             },
             {
              "value": "item2",
              "text": "No"
             }
            ]
           },
           {
            "type": "comment",
            "name": "question3",
            "title": "How did you hear about the service?",
            "isRequired": true
           }
          ],
          "title": "Health History"
         },
         {
          "name": "Personal Details",
          "elements": [
           {
            "type": "text",
            "name": "question4",
            "title": "First Name",
            "isRequired": true
           },
           {
            "type": "text",
            "name": "question5",
            "title": "Last Name",
            "isRequired": true
           },
           {
            "type": "radiogroup",
            "name": "question6",
            "title": "Gender",
            "isRequired": true,
            "choices": [
             {
              "value": "item1",
              "text": "Female"
             },
             {
              "value": "item2",
              "text": "Male"
             },
             {
              "value": "item3",
              "text": "Prefer not to say"
             }
            ]
           },
           {
            "type": "text",
            "name": "question7",
            "title": "Postcode",
            "isRequired": true
           },
           {
            "type": "text",
            "name": "question8",
            "title": "Date of Birth",
            "isRequired": true,
            "inputType": "date"
           }
          ],
          "title": "Personal Details"
         },
         {
          "name": "Diagnostics",
          "elements": [
           {
            "type": "radiogroup",
            "name": "question10",
            "title": "Little interest of pleasure in doing things?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question9",
            "title": "Feeling down, depressed, or hopeless?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question11",
            "title": "Trouble falling or staying asleep, or sleeping too much?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question12",
            "title": "Feeling tired or having little energy?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question13",
            "title": "Poor appetite or overeating?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question14",
            "title": "Feeling bad about yourself or that you are a failure or have let yourself or your family down?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question15",
            "title": "Trouble concentrating on things, such as reading the newspaper or watching television?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question16",
            "title": "Moving or speaking so slowly that other people could have noticed or the opposite, being so fidgety or restless that you have been around a lot more than usual?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           },
           {
            "type": "radiogroup",
            "name": "question17",
            "title": "Thoughts that you would be better off dead, or of hurting yourself in some other way?",
            "isRequired": true,
            "choices": [
             {
              "value": "0",
              "text": "Not at all"
             },
             {
              "value": "1",
              "text": "Several days"
             },
             {
              "value": "2",
              "text": "More than half the days"
             },
             {
              "value": "3",
              "text": "Nearly every day"
             }
            ],
            "otherText": "Nearly every day"
           }
          ],
          "title": "Diagnostics"
         },
         {
          "name": "Triggers",
          "elements": [
           {
            "type": "comment",
            "name": "question18",
            "title": "Existing Conditions"
           },
           {
            "type": "comment",
            "name": "question19",
            "title": "Status in Family"
           },
           {
            "type": "comment",
            "name": "question20",
            "title": "Income Issues"
           },
           {
            "type": "comment",
            "name": "question21",
            "title": "Social Benefits"
           }
          ],
          "title": "Triggers"
         },
         {
          "name": "Motivation",
          "elements": [
           {
            "type": "comment",
            "name": "question22",
            "title": "What caused you to seek help?",
            "isRequired": true
           },
           {
            "type": "comment",
            "name": "question23",
            "title": "What help do you believe you need?",
            "isRequired": true
           }
          ],
          "title": "Motivation"
         },
         {
          "name": "Demographics",
          "elements": [
           {
            "type": "text",
            "name": "question24",
            "title": "Preferred Spoken Language",
            "isRequired": true
           },
           {
            "type": "text",
            "name": "question25",
            "title": "Ethnicity",
            "isRequired": true
           },
           {
            "type": "text",
            "name": "question26",
            "title": "Religion",
            "isRequired": true
           },
           {
            "type": "text",
            "name": "question27",
            "title": "Disability Status",
            "isRequired": true
           },
           {
            "type": "text",
            "name": "question28",
            "title": "Sexual Orientation",
            "isRequired": true
           },
           {
            "type": "radiogroup",
            "name": "question29",
            "title": "If you do not wish to share this information, Please tick here",
            "isRequired": true,
            "choices": [
             {
              "value": "item1",
              "text": "Yes"
             },
             {
              "value": "item2",
              "text": "No"
             }
            ]
           }
          ],
          "title": "Demographics",
          "description": "To improve access to the service it would be helpful if you can provide demographic details"
         },
         {
          "name": "Confirmation",
          "title": "Confirmation",
          "description": "Thank you for your information, it will be sent to X. They will respond to the information you have shared by Y date."
         }
        ]
       });
    }
  }
  
  render() {
    return <div id="surveyCreatorContainer" />;
  }

  saveMySurvey = () => {
    var jsonString = JSON.stringify(this.surveyCreator.text);
    
    jsonString = jsonString.replace('\n', '');
    var survey_jsonRepresentation=JSON.parse(this.surveyCreator.text);
    console.log(survey_jsonRepresentation);
    var survey_StringRepresentation=JSON.stringify(survey_jsonRepresentation);
    if (survey_jsonRepresentation.title && survey_jsonRepresentation.description){ //justing TODO remove this 
      console.log("surveyJson");

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

          })
          .catch(error => {
            console.error(error);
          });

    }
    else{
      alert("Please define the title and description for this questionnaire in Survey Settings.");
    }
    

  };
}

export default SurveyCreator;
