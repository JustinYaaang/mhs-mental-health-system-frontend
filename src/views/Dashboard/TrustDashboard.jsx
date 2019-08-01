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
import InformationCard from 'components/DashboardComponent/InformationCard.jsx';
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { fetchQuestionnaires, getOrganizations, fetchWeeklyResult } from "../../services/BackendService";
import Questionnaire from "../Questionnaire/Questionnaire.jsx"

class Dashboard extends React.Component {
  state = {
    value: 0,
    totalPublishedQuestionnaire: 0,
    totalDraftQuestionnaire: 0,
    totalService: 0,
    dailySubmission: {
      labels:[],
      series:[[]]
    },
    seriesMax: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


 
  timeTrans(date){
    date = new Date(date);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
  };

  componentWillMount() {

    var todayTime = new Date( Date.parse( new Date()));
    var todayDate = this.timeTrans(todayTime);
    var lastTime = new Date( Date.parse( new Date())-(7*86400000));
    var lastDate = this.timeTrans(lastTime);
    var period = {
      "todayDate": todayDate,
      "lastDate": lastDate
    }

    fetchWeeklyResult(todayDate,lastDate).then(
      response => {
        var dailysubmit = {
          labels: [],
          series: [[]]
        }

        var dataTransfer = new Map([[0, 'S'], [1, 'M'], [2,'T'],[3, 'W'], [4, 'T'], [5, 'F'], [6,'S']]);
        var myday=todayTime.getDay();
        
        for(var i =6; i>= 0; i--){
          if(myday == -1){
            myday = 6;
          }
          if(response[myday] === undefined){
            dailysubmit.labels[i] = dataTransfer.get(myday);
            dailysubmit.series[0][i] = 0;
          }
          else{
            dailysubmit.labels[i] = dataTransfer.get(myday);
            dailysubmit.series[0][i] = response[myday].count;
          }   
          myday--;
      }
  
        var seriesMax = 1.10 * Math.max(...dailysubmit.series[0]);
        this.setState({'dailySubmission':dailysubmit, 'seriesMax': seriesMax})
      },
    );
    
     fetchQuestionnaires().then( //!!! AWAIT HERE
       response => {
        this.setState({'totalPublishedQuestionnaire': response.idPublishedList.length,  'totalDraftQuestionnaire':response.questionnaireDraftList.length,
        });
      }
    );

    getOrganizations().then(response=>{
      this.setState({'totalService':response.length})
    })
  }

  render() {
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
      waiting_patients: 18,
      percentage: 50,
    }

    return (
      <div>
        <GridContainer>
          <InformationCard 
            color={"info"} title={"Total Published Questionnaire"} value={this.state.totalPublishedQuestionnaire}
            daterange={"Updated today"} classes={classes}
          />
          <InformationCard 
            color={"success"} title={"Total Draft Questionnaire"} value={this.state.totalDraftQuestionnaire}
            daterange={"Updated just now"} classes={classes}
          />

          <InformationCard 
            color={"primary"} title={"Total Services"} value={this.state.totalService}
            daterange={"Updated just now"} classes={classes}
          />

        </GridContainer>
        <GridContainer>
          <LineGraph
          color={"success"} dailySubmission={this.state.dailySubmission} type={"Line"}
          dashboardData={dashboardData}
          classes={classes}
          />

        <Questionnaire question = {this.props.history} value = {8}/>

        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
