import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
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
              dailysubmit.series[0][response[i].dayOfWeek] = response[i].count
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
          }
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