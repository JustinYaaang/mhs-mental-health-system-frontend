import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Table from 'components/Table/Table.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Tasks from 'components/Tasks/Tasks.jsx'
import TriageRows from 'components/Tasks/TriageRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import { fetchUserAnswers,fetchUserDetil } from '../../services/BackendService'
import { getAnsweredQuestionnaire, getQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken } from '../../services/BackendService'

function getRole(){
  console.log(sessionStorage.role);
  return sessionStorage.role;
}

const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0'
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF'
    }
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1'
    }
  }
}

class TableList extends Component {
  constructor (props) {
    super(props)
    this.state = {pendingList:[],closeList:[]
    }
  }

  componentWillMount () {
    getRole();

    var role = "clinician2"
 
    fetchUserAnswers()
      .then(response => {
        var rowsPending = []
        var rowsResolve = []

        for (var i = 0; i < response.length; i++) {
         
          var d = new Date(response[i].createdAt)
          var dateString = d.toString()
          dateString = dateString.substring(0, dateString.lastIndexOf(':'))
            console.log(response[i].patient_id)
            var row = [response[i].title, response[i].patient_name, response[i].score, response[i]._id, response[i].status, dateString, response[i]._id, response[i].patient_id]
            if(response[i].status == 'PENDING'){
              rowsPending.push(row)
            }
            else{
              rowsResolve.push(row)
            }
          }
          
        this.setState({ pendingList: rowsPending,closeList: rowsResolve })
      })
      .catch(error => {
        console.error(error)
      })
  }

  redirectToAnswers = (questionnaireResponseId) => {
    document.location.href = '/patientanswers/'+ questionnaireResponseId;
  }

  render () {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <AnswerTabs
            // title="Submitted Questionnaires: "
            headerColor='info'
            onCreateNewClicked={() => this.handleCreateNewQuestionnaireClicked()}
            tabs={[
              {
                tabName: 'PENDING',
                tabIcon: Grade,
                tabContent: (
                  <TriageRows
                    tableHeaderColor='info'
                    tableHead={['Questionnaire Name', 'Patient Name', 'Predicted Score', 'NHS Number', 'Status', 'Time Submitted']}
                    checkedIndexes={[]}
                    tasks={this.state.pendingList}
                    onRowClicked={(questionnaireResponseId) => this.redirectToAnswers(questionnaireResponseId)}

                  />
                )
              },
              {
                tabName: 'RESOLVED',
                tabIcon: Code,
                tabContent: (
                  <TriageRows
                    tableHeaderColor='info'
                    tableHead={['Questionnaire Name', 'Patient Name', 'Predicted Score', 'NHS Number', 'Status', 'Time Submitted']}
                    checkedIndexes={[]}
                    tasks={this.state.closeList}
                  />
                )
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    )
  }
}

TableList.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(TableList)
