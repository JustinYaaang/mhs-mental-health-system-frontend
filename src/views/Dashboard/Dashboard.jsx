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
import { fetchQuestionnaires, deleteQuestionnaire, fetchWeeklyResult } from "../../services/BackendService";

function getRole(){
  console.log(sessionStorage.role);
  return sessionStorage.role;
}

class Dashboard extends React.Component {
  state = {
    value: 0,
    idPublishedList: [],
    questionnairePublishedList: [],
    idDraftList: [],
    questionnaireDraftList: [],
    totalPublishedQuestionnaire: 0,
    totalDraftQuestionnaire: 0,
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

  handleEditQuestionnaireClick = (index, status) => {
    console.log(index);
    if(status === 'DRAFT'){
      const questionnaireId = this.state.idDraftList[index];
      this.props.history.push(this.props.history.location.pathname + "/questionnaire/" + questionnaireId)
      // document.location.href = "/questionnaire/" + questionnaireId;
    }
    else if(status === 'PUBLISHED'){
      const questionnaireId = this.state.idPublishedList[index];
      this.props.history.push(this.props.history.location.pathname + "/questionnaire/" + questionnaireId)
      // document.location.href = "/questionnaire/" + questionnaireId;
    }
  };

  handleDeleteQuestionnaireClick = (index, status) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "The questionnaire cannot retrieve",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    })
    .then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'The questionnaire has been deleted',
          'success'
        );
        if(status === 'DRAFT'){
          const questionnaireId = this.state.idDraftList[index];
          deleteQuestionnaire(questionnaireId).then(
            
            response => {
              const idListBuffer = this.state.idDraftList.slice();
              idListBuffer.splice(index, 1);
              const questionnaireListBuffer = this.state.questionnaireDraftList.slice();
              questionnaireListBuffer.splice(index, 1);
              this.setState({idDraftList: idListBuffer, questionnaireDraftList: questionnaireListBuffer });
            }
          );
        }
        else if(status === 'PUBLISHED'){
          const questionnaireId = this.state.idPublishedList[index];
          deleteQuestionnaire(questionnaireId).then(
            response => {
              const idListBuffer = this.state.idPublishedList.slice();
              idListBuffer.splice(index, 1);
              const questionnaireListBuffer = this.state.questionnairePublishedList.slice();
              questionnaireListBuffer.splice(index, 1);
              this.setState({idPublishedList: idListBuffer, questionnairePublishedList: questionnaireListBuffer });
            }
          );
        }
      }
    });
  };

  handleCreateNewQuestionnaireClicked = () => {
    // document.location.href = "/questionnaire/";
    this.props.history.push(this.props.history.location.pathname + "/questionnaire")
  };

  timeTrans(date){
    date = new Date(date);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
  };

  componentWillMount() {

    getRole();

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
        console.log(dailysubmit.series[0]);
        console.log(Math.max(...dailysubmit.series[0]));
        var seriesMax = 1.10 * Math.max(...dailysubmit.series[0]);
        this.setState({'dailySubmission':dailysubmit, 'seriesMax': seriesMax})
      },
    );
    
     fetchQuestionnaires().then( //!!! AWAIT HERE
       response => {
        this.setState({'totalPublishedQuestionnaire': response.idPublishedList.length, 'totalDraftQuestionnaire': response.idDraftList.length,
        'idDraftList': response.idDraftList, 'idPublishedList': response.idPublishedList, 
              'questionnaireDraftList': response.questionnaireDraftList, 'questionnairePublishedList': response.questionnairePublishedList});
      }
    );
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

      unanswered: 8,
      waiting_patients: 18,
      percentage: 50,
    }

    console.log(dashboardData)
    console.log(this.state.dailySubmission)
    return (
      <div>
        <GridContainer>
          <InformationCard 
          color={"info"} title={"Total Published Questionnaires Designed"} value={this.state.totalPublishedQuestionnaire}
          daterange={"Updated today"} classes={classes}
          />
          <InformationCard 
          color={"danger"} title={"Total Draft Questionnaires Designed"} value={this.state.totalDraftQuestionnaire}
          daterange={"Updated just now"} classes={classes}
          />
          <InformationCard 
          color={"success"} title={"Total Trusts"} value={dashboardData.waiting_patients}
          daterange={"Just updated"} classes={classes}
          />

        </GridContainer>
        <GridContainer>
          <LineGraph
          color={"success"}  dailySubmission={this.state.dailySubmission} type={"Line"}
          dashboardData={dashboardData}
          classes={classes}
          
          />
          <GridItem xs={12} sm={12} md={8}>
            <AdminTabs
              title="Questionnaires :"
              headerColor="info"
              onCreateNewClicked={() => this.handleCreateNewQuestionnaireClicked()}
              tabs={[
                {
                  tabName: "PUBLISHED",
                  tabIcon: Grade,
                  tabContent: (
                    <Tasks
                      tableHeaderColor="info"
                      tableHead={["Name", "Description", "Status", "Modify"]}
                      checkedIndexes={[]}
                      tasks={this.state.questionnairePublishedList}
                      onEditClicked={(index) => this.handleEditQuestionnaireClick(index, 'PUBLISHED')}
                      onDeleteClicked={(index) => this.handleDeleteQuestionnaireClick(index, 'PUBLISHED')}
                    />
                  )
                },
                { 
                  tabName: "DRAFT",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      tableHeaderColor="info"
                      tableHead={["Name", "Description", "Status", "Modify"]}
                      checkedIndexes={[]}
                      tasks={this.state.questionnaireDraftList}
                      onEditClicked={(index) => this.handleEditQuestionnaireClick(index, 'DRAFT')}
                      onDeleteClicked={(index) => this.handleDeleteQuestionnaireClick(index, 'DRAFT')}
                    />
                  )
                }, 
              ]}
            />
          </GridItem>

        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
