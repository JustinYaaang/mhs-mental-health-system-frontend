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
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import TrustServiceFrom from 'views/Forms/TrustServiceForm.jsx'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import { fetchUserAnswers, getPersonel } from '../../services/BackendService'
import { getAnsweredQuestionnaire,getOrganization, getQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken } from '../../services/BackendService'
import TrustServiceForm from 'views/Forms/TrustServiceForm.jsx'

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

class TrustCreateNew extends Component {
  constructor (props) {
    super(props)
    const{id}=this.props.match.params
    this.state = { id:id
    }
  }

  componentWillMount () {

  }

   render () {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
         <TrustServiceForm hasDetails={false} organization={"trust"}/>
          {/* <Table
                tableHeaderColor='primary'
                // tableHead={["Questionnaire Name", "Patient Name", "Time", "Final Score", "Id", "Questionnaire Id"]}
                tableHead={['Questionnaire Name', 'Patient Name', 'Predicted Score', 'NHS Number', 'Status', 'Time Submitted']}
                tableData={this.state.userAnswers}
              />
            </CardBody>
          </Card> */}
        </GridItem>
      </GridContainer>
    )
  }
}

TrustCreateNew.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(TrustCreateNew)
