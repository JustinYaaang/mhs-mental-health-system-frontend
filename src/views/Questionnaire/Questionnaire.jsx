import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Grade from "@material-ui/icons/Grade";
import Code from "@material-ui/icons/Code";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import TaskView from "components/Tasks/TaskView.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import { fetchQuestionnaires} from "../../services/BackendService";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Questionnaire extends React.Component{
  state = {
    idPublishedList: [],
    questionnairePublishedList: [],
    idDraftList: [],
    questionnaireDraftList: [],
  };

  componentWillMount() {
    fetchQuestionnaires().then( //!!! AWAIT HERE
      response => {
       this.setState({'idDraftList': response.idDraftList, 'idPublishedList': response.idPublishedList, 
             'questionnaireDraftList': response.questionnaireDraftList, 'questionnairePublishedList': response.questionnairePublishedList});
     });
  }
  
    handleViewQuestionnaireClick = (index, status) => {
    
      if(status === 'DRAFT'){
        const questionnaireId = this.state.idDraftList[index];
        this.props.question.push(this.props.question.location.pathname + "/questionnaire/" + questionnaireId)
  
      }
      else if(status === 'PUBLISHED'){
        const questionnaireId = this.state.idPublishedList[index];
        this.props.question.push(this.props.question.location.pathname + "/questionnaire/" + questionnaireId)
      }
    };
  
    render(){
        return(
          <GridItem xs={12} sm={12} md={this.props.value}>
          <CustomTabs
            title="Questionnaires :"
            headerColor="info"
            tabs={[
              {
                tabName: "PUBLISHED",
                tabIcon: Grade,
                tabContent: (
                  <TaskView
                    tableHeaderColor="info"
                    tableHead={["Name", "Description", "Status", "Modify"]}
                    checkedIndexes={[]}
                    tasks={this.state.questionnairePublishedList}
                    onViewClicked={(index) => this.handleViewQuestionnaireClick(index, 'PUBLISHED')}
                  />
                )
              },
              { 
                tabName: "DRAFT",
                tabIcon: Code,
                tabContent: (
                  <TaskView
                    tableHeaderColor="info"
                    tableHead={["Name", "Description", "Status", "Modify"]}
                    checkedIndexes={[]}
                    tasks={this.state.questionnaireDraftList}
                    onViewClicked={(index) => this.handleViewQuestionnaireClick(index, 'DRAFT')}
                  />
                )
              }, 
            ]}
          />
        </GridItem>
        )
    }
  }
  
  Questionnaire.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(dashboardStyle)(Questionnaire);