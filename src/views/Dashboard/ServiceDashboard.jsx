import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import InformationCard from 'components/DashboardComponent/InformationCard.jsx';
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import {fetchUserAnswers, fetchWeeklyResult } from "../../services/BackendService";
import Questionnaire from "../Questionnaire/Questionnaire.jsx"
import LineChart from "../LineChart/LineChart"
class Dashboard extends React.Component {
  state = {
    value: 0,
    totalStep: 0,
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
        window.location.href = '/service/triagelist'
    }
  };

  componentWillMount() {
    fetchUserAnswers()
      .then(response => {
        var rowsPending = 0;
        var rowsResolve = 0;

        for (var i = 0; i < response.length; i++) {
            if(response[i].status == 'PENDING'){ //&& response[i].service ==serviceClinician ){
              rowsPending++;
            }
            else if (response[i].status == 'RESOLVED'){// && response[i].service ==serviceClinician ){
              rowsResolve++;
            }
          }
        this.setState({ 'totalPending': rowsPending,'totalClose': rowsResolve })
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
            color={"danger"} title={"Number Triaged"} value={this.state.totalClose}
            daterange={"Just updated"} classes={classes} onViewClicked={() => this.handleViewResultClick('triagelist')}
          />

          <InformationCard 
            color={"success"} title={"More Information Required"} value={this.state.totalStep}
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
