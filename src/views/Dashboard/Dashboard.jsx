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
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import swal from 'sweetalert2'


import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { fetchQuestionnaires, deleteQuestionnaire } from "../../services/BackendService";

class Dashboard extends React.Component {
  state = {
    value: 0,
    idPublishedList: [],
    questionnairePublishedList: [],
    idDraftList: [],
    questionnaireDraftList: [],
    totalQuestionnaire: 0,
    dailySubmission: [],
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
      document.location.href = "/questionnaire/" + questionnaireId;
    }
    else if(status === 'PUBLISHED'){
      const questionnaireId = this.state.idPublishedList[index];
      document.location.href = "/questionnaire/" + questionnaireId;
    }
  };

  handleDeleteQuestionnaireClick = (index, status) => {
    swal({
      title: "Are you sure?",
      text: "The questionnaire cannot recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("The questionnaire has been deleted!", {
          icon: "success",
        });

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
      } else {
        swal("The questionnaire is safe!");
      }
    });
  };

  handleCreateNewQuestionnaireClicked = () => {
    document.location.href = "/questionnaire/";
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


    console.log(todayDate);
    console.log(lastDate);

    fetchQuestionnaires().then(
      response => {
        //console.log(response.idPublishedList.length + response.questionnaireDraftList.length);
        this.setState({'totalQuestionnaire': response.idPublishedList.length + response.questionnaireDraftList.length})
        this.setState({'idDraftList': response.idDraftList, 'idPublishedList': response.idPublishedList, 
              'questionnaireDraftList': response.questionnaireDraftList, 'questionnairePublishedList': response.questionnairePublishedList});
      }
    );
  }

  render() {
    var Chartist = require("chartist");
    const { classes } = this.props;

    const dashboardData = {
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]]
        },
        options: {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
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
      // default_questionnaires: [['Triage To Treat', 'This questionnaire is used to triage and treat patients', 'APPROVED'],
      // ['Camberwell Center', 'This questionnaire is used to triage and treat patients', 'PUBLISHED'],
      // ['Triage To Refer', 'This questionnaire is used to triage and treat patients', 'DRAFT']],
      // custom_questionnaires: [['Test Questionnaire', 'This questionnaire is used to triage and treat patientsiption1', 'DRAFT'],
      // ['Second Test', 'This questionnaire is used to triage and treat patients', 'DRAFT'],
      // ['Third Test', 'This questionnaire is used to triage and treat patients', 'DRAFT']],
    }

    return (
      <div>
        <GridContainer>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <All />
                </CardIcon>
                <p className={classes.cardCategory}>Total Questionnaires</p>
                <h3 className={classes.cardTitle}>{this.state.totalQuestionnaire}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Updated today
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Pending Cases</p>
                <h3 className={classes.cardTitle}>{dashboardData.unanswered}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Updated just now
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Total Cases</p>
                <h3 className={classes.cardTitle}>{dashboardData.waiting_patients}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dashboardData.dailySalesChart.data}
                  type="Line"
                  options={dashboardData.dailySalesChart.options}
                  listener={dashboardData.dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Engagement</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />{dashboardData.percentage}%
                  </span>{" "}
                  increase today.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={8}>
            <CustomTabs
              title="Questionnaires :"
              headerColor="info"
              onCreateNewClicked={() => this.handleCreateNewQuestionnaireClicked()}
              tabs={[
                {
                  tabName: "PUBLISHED",
                  tabIcon: Grade,
                  tabContent: (
                    <Tasks
                      tableHeaderColor="primary"
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
                      tableHeaderColor="primary"
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
