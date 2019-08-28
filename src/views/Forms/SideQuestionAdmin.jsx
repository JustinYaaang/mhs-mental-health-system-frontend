import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import QuestionnaireAdmin from "../Questionnaire/QuestionnaireAdmin"

class SideQuestionAdmin extends React.Component{
    render(){
        return(
            <QuestionnaireAdmin question = {this.props.history} value = {12}/>
        )
    }
  }
  
  SideQuestionAdmin.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(dashboardStyle)(SideQuestionAdmin);