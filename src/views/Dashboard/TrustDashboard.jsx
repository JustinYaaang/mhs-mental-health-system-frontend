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
import LineChart from "../LineChart/LineChart"

class Dashboard extends React.Component {
  state = {
    value: 0,
    totalPublishedQuestionnaire: 0,
    totalDraftQuestionnaire: 0,
    totalService: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleViewResultClick = (page) => {
    if(page == 'questionnaire'){
        window.location.href = '/trust/questionnaire'
    }
    else if(page == 'service'){
        window.location.href = '/trust/service'
    }
  };

  componentWillMount() {

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
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <InformationCard 
            color={"info"} title={"Total Published Questionnaire"} value={this.state.totalPublishedQuestionnaire}
            daterange={"Updated today"} classes={classes} onViewClicked={() => this.handleViewResultClick('questionnaire')}
          />
          <InformationCard 
            color={"success"} title={"Total Draft Questionnaire"} value={this.state.totalDraftQuestionnaire}
            daterange={"Updated just now"} classes={classes} onViewClicked={() => this.handleViewResultClick('questionnaire')}
          />

          <InformationCard 
            color={"primary"} title={"Total Services"} value={this.state.totalService}
            daterange={"Updated just now"} classes={classes} onViewClicked={() => this.handleViewResultClick('service')}
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
