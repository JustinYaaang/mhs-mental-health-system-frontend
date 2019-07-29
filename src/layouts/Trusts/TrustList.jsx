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
import AnswerRows from 'components/Tasks/AnswerRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import { fetchUserAnswers, getOrganizations } from '../../services/BackendService'
import { getAnsweredQuestionnaire, getOrganization, getQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken } from '../../services/BackendService'


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

class TrustList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
      // idList: []
    }
  }

  componentWillMount() {
    getOrganizations().then(response=>{
      var i=1;
      var thelist=new
       Array()
      response.forEach((map)=>{
        thelist.push([
          i,map.name,map.description,map.address1+" "+map.address2,map.postcode,map.telephone,map._id
        ])
        i++
       // console.log(thelist)
        this.setState({list:thelist})
      })
    })
  }

  redirectToTrustDetails = (trustId) => {
    this.props.history.push(this.props.history.location.pathname + "/" + trustId)
    //document.location.href = '/admin/trusts/'+ "26426287u24";
  }


  createNewOrganization=()=>{
    this.props.history.push(this.props.history.location.pathname + "/new")
    console.log("!!")
  }
  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <Card> */}
          {/* <CardHeader color='primary'>
              <h4 className={styles.cardTitleWhite}>Submitted Questionnaires</h4>
              <p className={styles.cardCategoryWhite} />
            </CardHeader> */}
          {/* <CardBody> */}
          <AnswerTabs
            // title="Submitted Questionnaires: "
            headerColor='info'
            tabs={[
              {
                tabName: 'TRUSTS',
                tabIcon: Code,
                tabContent: (
                  <AnswerRows
                    createNew={(trustId) => this.createNewOrganization(trustId)}
                    onRowClicked={(trustId) => this.redirectToTrustDetails(trustId)}
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'Trust Name', 'Description', 'Address', 'Postcode', 'Telephone']}
                    checkedIndexes={[]}
                    tasks={this.state.list}
                  // tasks={[['1', 'Central and North West London NHS Foundation Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['2', 'East London NHS Foundation Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['3', 'South West London and St George\'s Mental Health NHS Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['4', 'Camden and Islington NHS Foundation Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['5', 'West London NHS Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['6', 'Barnet, Enfield and Haringey Mental Health Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['7', 'South London & Maudsley N H S Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['8', 'West London NHS Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['9', 'Central London Community Healthcare NHS Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id'],
                  // ['10', 'North East London NHS Foundation Trust', 'Mental Health Services', '350 Euston Rd, Fitzrovia', 'NW1 3AX', '020 3214 5700', 'Trust Id']]}

                  />
                )
              }
            ]}
          />
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

TrustList.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(TrustList)
