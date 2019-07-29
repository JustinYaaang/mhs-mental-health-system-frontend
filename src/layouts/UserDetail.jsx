
import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardAvatar from 'components/Card/CardAvatar.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import {fetchUserDetail } from '../services/BackendService'

import Table from "components/Table/Table.jsx";

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  }
}

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstname: [],
          lastname:[],
          email:[],
          postcode:[]
      }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        console.log(id)
        fetchUserDetail(id)
          .then(response => {
           
            // for (var i = 0; i < response.length; i++) {
             
            //   var d = new Date(response[i].createdAt)
            //   var dateString = d.toString()
            //   dateString = dateString.substring(0, dateString.lastIndexOf(':'))
            //     console.log(response[i].patient_id)
            //     var row = [response[i].title, response[i].patient_name, response[i].score, response[i]._id, response[i].status, dateString, response[i]._id, response[i].patient_id]
            //     if(response[i].status == 'PENDING'){
            //       rowsPending.push(row)
            //     }
            //     else{
            //       rowsResolve.push(row)
            //     }
            //   }
              console.log(response.email)
            this.setState({ firstname: response.first_name, lastname:response.last_name, email: response.email,postcode:response.postcode })
          })
          .catch(error => {
            console.error(error)
          })
      }

      render () {
        const { classes } = this.props;
        return (
          
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color='info'>
                    <h4 className={classes.cardTitleWhite}>Patient Profile</h4>
                    <p className={classes.cardCategoryWhite}>View the detail of Patient</p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText='Service'
                          id='company-disabled'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText='Username'
                          id='username'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                              disabled: true
                            }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText= {this.state.email}
                          id='email-address'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                              disabled: true
                            }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText={this.state.firstname}
                          id='first-name'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                              disabled: true
                            }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText={this.state.lastname}
                          id='last-name'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                              disabled: true
                            }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                  
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText={this.state.postcode}
                          id='postal-code'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                              disabled: true
                            }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <Table
                          tableHeaderColor="info"
                          tableHead={['Questionnaire Name','Status']}
                          tableData={[
                              [ "Questionnaire 1" , "Pending"] ,
                              [ "Questionnaire 2" , "Close"] ,
                              
                          ]}
                      />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            
          </div>
        )
      }
}






UserDetail.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(UserDetail)
