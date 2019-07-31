import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import AnswerRows from 'components/Tasks/ListRows.jsx'
import AnswerTabs from 'components/CustomTabs/AnswerTabs.jsx'
import Code from '@material-ui/icons/Code'
import { getOrganizations, deleteOrganization, getPersonnel, deletePersonnel } from '../../services/BackendService'
import swal from 'sweetalert2'

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

class ClinicianList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentWillMount() {
    console.log("fetch clinicians")
    getPersonnel().then(response => {
      var i = 1;
      var thelist = new
        Array()
      response.forEach((map) => {
        thelist.push([
          i, map.first_name, map.last_name, map.role, map.email, map.telephone, map._id
        ])
        i++
        this.setState({ list: thelist })
      })
    })
  }

  redirectToClinicianDetails = (clinicianId) => {
    this.props.history.push(this.props.history.location.pathname + "/" + clinicianId)
  }


  createNewClinician = () => {
    this.props.history.push(this.props.history.location.pathname + "/new")
    console.log("!!")
  }

  deleteClinician = (clinicianId) => {

    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this entry?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          deletePersonnel(clinicianId).then(response => {
            swal("The entry has been deleted!", {
              icon: "success",
            });
            this.setState({ personelList: [] })
            this.componentWillMount();
          })


        } else {
          swal('Action canceled');
        }
      });

  }

  render() {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <AnswerTabs
            headerColor='info'
            tabs={[
              {
                tabName: 'CLINICIANS',
                tabIcon: Code,
                tabContent: (
                  <AnswerRows
                    onDeleteItemClicked={(clinicianId) => this.deleteClinician(clinicianId)}
                    createNew={() => this.createNewClinician()}
                    onRowClicked={(clinicianId) => this.redirectToClinicianDetails(clinicianId)}
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'First Name', 'Last Name', 'Role', 'Email', 'Telephone']}
                    checkedIndexes={[]}
                    tasks={this.state.list}
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

ClinicianList.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(ClinicianList)
