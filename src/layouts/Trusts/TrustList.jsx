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
import Code from '@material-ui/icons/Code'
import { getOrganizations,deleteOrganization } from '../../services/BackendService'
import swal from 'sweetalert';
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
        this.setState({list:thelist})
      })
    })
  }

  redirectToTrustDetails = (trustId) => {
    this.props.history.push(this.props.history.location.pathname + "/" + trustId)
  }


  createNewOrganization=()=>{
    this.props.history.push(this.props.history.location.pathname + "/new")
    console.log("!!")
  }

deleteTrust=(trustId)=>{

  swal({
    title: "Are you sure?",
    text: "Are you sure you want to delete this entry?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteOrganization(trustId).then(response=>{
        swal("The entry has been deleted!", {
          icon: "success",
        });
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
                tabName: 'TRUSTS',
                tabIcon: Code,
                tabContent: (
                  <AnswerRows
                  onDeleteItemClicked={(trustId)=>this.deleteTrust(trustId)}
                    createNew={() => this.createNewOrganization()}
                    onRowClicked={(trustId) => this.redirectToTrustDetails(trustId)}
                    tableHeaderColor='primary'
                    tableHead={['S/N', 'Trust Name', 'Description', 'Address', 'Postcode', 'Telephone']}
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

TrustList.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(TrustList)
