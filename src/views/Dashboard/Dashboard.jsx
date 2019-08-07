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
import Tasks from "components/Tasks/Tasks.jsx";
import AdminTabs from "components/CustomTabs/AdminTabs.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Swal from 'sweetalert2';
import InformationCard from 'components/DashboardComponent/InformationCard.jsx';
import LineGraph from 'components/DashboardComponent/LineGraph.jsx';

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { fetchQuestionnaires, fetchWeeklyResult,getOrganizations } from "../../services/BackendService";
import QuestionnaireAdmin from "../Questionnaire/QuestionnaireAdmin"
import LineChart from "../LineChart/LineChart"

function getRole(){
  console.log(sessionStorage.role);
  return sessionStorage.role;
}
class Dashboard extends React.Component {
  state = {
    value: 0,
    totalPublishedQuestionnaire: 0,
    totalDraftQuestionnaire: 0,
    totalTrusts:0,
  };
  
  handleChange = (event, value) => {
    this.setState({ value: value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleViewResultClick = (page) => {
    if(page == 'trust'){
        window.location.href = '/admin/trusts'
    }
    else if(page == 'questionnaire'){
        window.location.href = '/admin/questionnaire'
    }
  };

  componentWillMount() {

    getRole();

    fetchQuestionnaires().then( //!!! AWAIT HERE
      response => {
        this.setState({'totalPublishedQuestionnaire': response.idPublishedList.length, 'totalDraftQuestionnaire': response.idDraftList.length});
      }
    );

    getOrganizations().then(response=>{
      this.setState({'totalTrusts':response.length})
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.history)

    return (
      <div>
        {/* <GridContainer>
          <InformationCard 
            color={"info"} title={"Total Published Questionnaires"} value={this.state.totalPublishedQuestionnaire}
            daterange={"Updated today"} classes={classes} onViewClicked={() => this.handleViewResultClick('questionnaire')}
          />
          <InformationCard 
            color={"danger"} title={"Total Draft Questionnaires"} value={this.state.totalDraftQuestionnaire}
            daterange={"Updated just now"} classes={classes} onViewClicked={() => this.handleViewResultClick('questionnaire')}
          />
          <InformationCard 
            color={"success"} title={"Total Trusts"} value={this.state.totalTrusts}
            daterange={"Just updated"} classes={classes} onViewClicked={() => this.handleViewResultClick('trust')}
          />

        </GridContainer> */}
        <GridContainer>
          {/* <LineChart/> */}
          <QuestionnaireAdmin question = {this.props.history}/>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
