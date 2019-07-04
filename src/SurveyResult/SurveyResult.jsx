import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "bootstrap/dist/css/bootstrap.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "jquery-bar-rating/dist/themes/css-stars.css";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
import * as widgets from "surveyjs-widgets";
import "icheck/skins/square/blue.css";
import axios from "axios";
import {getAnsweredQuestionnaire, getQuestionnaire} from "../components/BackendService/BackendService";


window["$"] = window["jQuery"] = $;
require("icheck");

Survey.StylesManager.applyTheme("darkblue");

widgets.icheck(Survey, $);
widgets.select2(Survey, $);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey, $);
widgets.jqueryuidatepicker(Survey, $);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey, $);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey, $);
widgets.bootstrapslider(Survey);

class SurveyResult extends Component {

  constructor(props) {
    super(props);
    this.state = { json: 
      {
        "title": "",
        "description": "",
        "completedHtml": "",
        "pages": [],
        "showProgressBar": ""
      },
      answers : {}
    };
  }


  sendResult(){
    console.log("value changed!");
  }

  onValueChanged = (result) => {
    console.log("value changed!");
  }

  sendResultOnPageNext() {
    console.log("sendResultOnPageNext");
  }

  goNextPageAutomatic() {
    console.log("goNextPageAutomatic");
  }
  
  onComplete = (result) => {
    var finalScore = 0;
    var tableData;
    var i = 1;

    console.log(result);
    console.log(result.valuesHash);
    console.log(result.valuesHash.Question1);
    var answer=[];
    tableData = "<tr><th scope='col'>" + "Question" + "</th><th scope='col'>" + " Answer" + "</th></tr>" 


    Object.keys(result.valuesHash).map(function (key) {
 
      tableData+="<tr>"
      tableData += "<td >" +  "Question " + i + "</td>"
      finalScore = finalScore + parseInt(result.valuesHash[key], 10);

      tableData+="<td >"+ result.valuesHash[key]+"</td>";
      console.log(finalScore);
      tableData+="</tr>"
      
      answer.push({
        questionnode_id: "5d0cbbe6fc101609e9765de3", //must get this as well
        title: "Question" + i, //must get this
        value: result.valuesHash[key]
      });
      i++;

    })
    this.postAnswers(answer,"5d0ce7a7fc101609e9765de3", this.state.json.title);
    $("#tbody1").html(tableData);
    document.querySelector('#finalScore').textContent = "Final score is " + finalScore;
    
    document.querySelector('#jsonSection').textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);

  };


  /**
   * Function that posts answers to server. Needs to be intergrated in Backend Service
   * @param {*} ans list of answers
   * @param {*} questionnaire_id the questionnaire ID
   * @param {*} title of the questionnaire
   */
  postAnswers(ans,questionnaire_id,title){
    console.log(ans);
    console.log(questionnaire_id)
    const backendURL = "http://178.128.34.125/api/v1/useranswers"; //will change
    axios({
      method: 'post',
      url: backendURL,
      data: { 
        "questionnaire_id": questionnaire_id,
        "title": title,
        "answer": ans 
      }
    });
  }

  componentWillMount() {

    const qId = "5d1a1d16d910160030d04979";
    const aId = "5d1c7bb973589a0030d798ae";
    const testUrl = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS/" + qId;

     getQuestionnaire(testUrl)
        .then(fetched_data => {
          var jsonData = fetched_data.body;
          var jsonFormatData = JSON.parse(jsonData);

          for (var i=1; i<jsonFormatData.pages.length; i++){
            if (jsonFormatData.pages[i].elements){
              jsonFormatData.pages[0].elements = jsonFormatData.pages[0].elements.concat(jsonFormatData.pages[i].elements)
            }
          }
          jsonFormatData.pages = [jsonFormatData.pages[0]]
          jsonFormatData.pages[0].title = ""
          jsonData = JSON.stringify(jsonFormatData);
          console.log("JSON.parse(jsonData)");

          console.log(JSON.parse(jsonData));
          this.setState( {json: jsonData} );
        })
        .catch(error => {
          console.error(error);
        });


    getAnsweredQuestionnaire(aId)
        .then(fetched_answers => {
          console.log("fetched_answers")
          this.setState( {answers: JSON.parse(fetched_answers) } );
          // console.log(this.state.answers);
          // console.log(fetched_answers);

        })
        .catch(error => {
          console.error(error);
        });
  }

  componentDidMount() {
    console.log("componentDidMount logs");
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    this.model.data = this.state.answers;
    console.log("this.state.answers")
    console.log(this.state.answers)
    // this.model.data= JSON.parse(this.state.answers);
    this.model.mode="display";
    console.log(this.model.data);
    //set as read only
    return (
      <div className="SurveyResult">
        <div className="surveyjs" >
          {/*If you want to show survey, uncomment the line below*/}
          <Survey.Survey
            model={this.model}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}
          />
          {/*If you do not want to show Survey Creator, comment the line below*/}
          {/*<h1>SurveyJS Creator in action:</h1>
          <SurveyCreator /> */}
          <center>
            <table border = "1" width = "180" >
              <tbody id="tbody1">
             
              </tbody>
            </table>
          </center>
          <div id="finalScore"></div>
          <div id="jsonSection"></div>
        </div>
        
      </div>
    );
  }
}

export default SurveyResult;

