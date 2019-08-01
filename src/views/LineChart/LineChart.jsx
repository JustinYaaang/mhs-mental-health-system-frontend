import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import Grade from "@material-ui/icons/Grade";
import Code from "@material-ui/icons/Code";
import All from "@material-ui/icons/AllInboxOutlined";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TaskView from "components/Tasks/TaskView.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import InformationCard from 'components/DashboardComponent/InformationCard.jsx';
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import QuestionnaireAdmin from "../Questionnaire/QuestionnaireAdmin"
import {fetchWeeklyResult } from "../../services/BackendService";

class SideQuestionAdmin extends React.Component{
    state = {
        dailySubmission: {
          labels:[],
          series:[[]]
        },
        seriesMax: 0,
      };

    timeTrans(date){
        date = new Date(date);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        return Y+M+D;
      };

    componentWillMount() {
        var todayTime = new Date( Date.parse( new Date())+(86400000));
        var todayDate = this.timeTrans(todayTime);
        var lastTime = new Date( Date.parse( new Date())-(6*86400000));
        var lastDate = this.timeTrans(lastTime);
    
        fetchWeeklyResult(todayDate,lastDate).then(
          response => {
            var dailysubmit = {
              labels: [],
              series: [[0,0,0,0,0,0,0]]
            }
    
            var dataTransfer = new Map([[1, 'S'], [2, 'M'], [3,'T'],[4, 'W'], [5, 'T'], [6, 'F'], [7,'S']]);
            var myday=todayTime.getDay();
            
            for(var i =6; i>= 0; i--){
              if(myday == 0){
                myday = 7;
              }
              dailysubmit.labels[i] = dataTransfer.get(myday);
              myday--;
            }
    
            for(var i = 0; i<response.length;i++){
              dailysubmit.series[0][response[i].dayOfWeek+1] = response[i].count
            }
    
            var seriesMax = 1.10 * Math.max(...dailysubmit.series[0]);
            this.setState({'dailySubmission':dailysubmit, 'seriesMax': seriesMax})
          },
        );
  
    }
    render(){
        var Chartist = require("chartist");
        const { classes } = this.props;
    
        const dashboardData = {
          dailySalesChart: {
            options: {
              lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
              }),
              low: 0,
              high: this.state.seriesMax, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
              chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }
            }
          },
    
          unanswered: 8,
          waiting_patients: 18,
          percentage: 50,
        }

        return(
            <LineGraph
                color={"success"} dailySubmission={this.state.dailySubmission} type={"Line"}
                dashboardData={dashboardData}
                classes={classes}
                />
         
        )
    }
  }
  
  SideQuestionAdmin.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(dashboardStyle)(SideQuestionAdmin);