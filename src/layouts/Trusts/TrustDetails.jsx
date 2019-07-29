import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import AnswerRows from 'components/Tasks/AnswerRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import TrustServiceFrom from 'views/Forms/TrustServiceForm.jsx'
import Code from '@material-ui/icons/Code'
import { getPersonnel, deletePersonnel } from '../../services/BackendService'

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

class TrustDetails extends Component {
  constructor (props) {
    super(props)
    const{id}=this.props.match.params //organization's ID
    sessionStorage.setItem('organizationID',id)
    this.state = { id:id,personelList:''
    }
  }

  componentWillMount () {
    getPersonnel().then(response=>{ //Get the personel list from backend
      console.log("response"+ response)
      var counter=1;
      var thelist=new Array() //list for storing the personnel
      response.forEach((map)=>{
        thelist.push([
          counter,map.first_name,map.last_name,map.email,map.trust,map._id
        ])
        counter++
        this.setState({personelList:thelist})
      })
    })



  }

  redirectToManagerDetails = (managerId) => { //Function that redirects to the edit manager page
   this.props.history.push(this.props.history.location.pathname + "/" + managerId)
  }


  createNewUser=()=>{//Function that redirects to the create new manager page 
    this.props.history.push(this.props.history.location.pathname + "/manager/new")

  }

deleteManager=(managerId)=>{
  deletePersonnel(managerId).then(response=>{
    console.log(response)
  })
}
  render () {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <AnswerTabs
            headerColor='info'
            tabs={[
              {
                tabName: 'DETAILS',
                tabIcon: Code,
                tabContent: (
                    <TrustServiceFrom hasDetails={true} organization={"trust"} id={this.state.id} />
                )
              },
              {
                tabName: 'MANAGERS',
                tabIcon: Code,
                tabContent: (
                  <AnswerRows
                  onDeleteItemClicked={(managerId)=>this.deleteManager(managerId)}
                  createNew={() => this.createNewUser() /*Function for create new manager */}
                     onRowClicked={(managerId) => this.redirectToManagerDetails(managerId)/* Function for edit manager */}
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'First Name', 'Last Name', 'Email', 'Trust Name'] /**Table hearders */}
                    checkedIndexes={[]}
                    tasks={this.state.personelList}
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

TrustDetails.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(TrustDetails)
