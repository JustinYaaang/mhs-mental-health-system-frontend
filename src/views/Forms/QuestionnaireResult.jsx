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
import { fetchQuestionnaire} from "../../services/BackendService";

import FixedActions from "components/FixedPlugin/FixedActions.jsx";

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

class QuestionnaireResult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      json:
      {
        "title": "",
        "description": "",
        "completedHtml": "",
        "pages": [],
        "showProgressBar": ""
      },
      id: this.props.id, // the ID
    };
  }

  componentWillMount() {
    //const {id} = this.props.match.params;
    fetchQuestionnaire(this.state.id)
      .then(fetched_answers => {
        //this.setState({ answers: JSON.parse(fetched_answers.body) });
        var jsonData = fetched_answers.body;
        console.log(jsonData)
        var jsonFormatData = JSON.parse(jsonData);
        for (var i = 1; i < jsonFormatData.pages.length; i++) {
          if (jsonFormatData.pages[i].elements) {
            jsonFormatData.pages[0].elements = jsonFormatData.pages[0].elements.concat(jsonFormatData.pages[i].elements)
          }
        }
        jsonFormatData.pages = [jsonFormatData.pages[0]]
        jsonFormatData.pages[0].title = ""
        jsonData = JSON.stringify(jsonFormatData);
        this.setState({ json: jsonData });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    Survey.Survey.cssType = "bootstrap";
    this.model = new Survey.Model(this.state.json);
    this.model.data = this.state.answers;
    //set as read only
    this.model.mode = "display";

    return (
      <div>
        <div className="SurveyResult">
          <div className="surveyjs" >
            <Survey.Survey
              model={this.model}
            />

          </div>

        </div>
        {/* <FixedActions
              bgColor={this.state["color"]}
              bgImage={this.state["image"]}
              handleFixedClick={this.handleFixedClick}
              fixedClasses={this.state.fixedClasses}
          /> */}
      </div>
      
    );
  }
}

export default QuestionnaireResult;

