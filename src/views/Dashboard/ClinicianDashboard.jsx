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
import InformationCard from 'components/DashboardComponent/InformationCard.jsx';
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { fetchQuestionnaires, deleteQuestionnaire, fetchWeeklyResult,fetchUserAnswers } from "../../services/BackendService";
import Questionnaire from "../Questionnaire/Questionnaire.jsx"
import LineChart from "../LineChart/LineChart"
class Dashboard extends React.Component {
  state = {
    value: 0,
    totalQuestionnaire: 0,
    totalPending:0,
    totalClose:0,
  };
  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleViewResultClick = (page) => {
    if(page == 'triagelist'){
        window.location.href = '/clinician/triagelist'
    }
    else{
        console.log("clickkkkkkk")
    }
  };

  componentWillMount() {
    fetchQuestionnaires().then( //!!! AWAIT HERE
       response => {
        this.setState({'totalQuestionnaire': response.idPublishedList.length + response.questionnaireDraftList.length,});
      }
    );

    fetchUserAnswers()
      .then(response => {
        var pending = 0;
        var close = 0;
        for(var i = 0; i <  response.length; i++){
            if(response[i].status == 'PENDING'){
                pending++;
            }
            else if(response[i].status == 'RESOLVED')
            {
                close++;
            }
        }
        this.setState({ totalPending:pending,totalClose:close })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
  
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <InformationCard 
          color={"info"} title={"Outstanding Cases"} value={this.state.totalPending}
          daterange={"Updated today"} classes={classes} onViewClicked={() => this.handleViewResultClick('triagelist')}
          />
          
          <InformationCard 
          color={"danger"} title={"Number Triage"} value={this.state.totalClose}
          daterange={"Just updated"} classes={classes} onViewClicked={() => this.handleViewResultClick('triagelist')}
          />
          <InformationCard 
          color={"success"} title={"More information require"} value={this.state.totalClose}
          daterange={"Updated today"} classes={classes} onViewClicked={() => this.handleViewResultClick('triagelist')}
          />

        </GridContainer>
  
        <GridContainer>
          <LineChart/>
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
