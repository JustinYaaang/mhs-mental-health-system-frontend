
import React, { Component } from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardAvatar from 'components/Card/CardAvatar.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import {fetchUserDetail } from '../../services/BackendService'
import TextField from '@material-ui/core/TextField';
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
          postcode:[],
          service:[]
      }
    }

    componentWillMount() {
        const {id} = this.props.match.params;
        console.log(id)
        fetchUserDetail(id)
          .then(response => {
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
              <GridItem xs={12} sm={12} md={10}>
                <Card>
                  <CardHeader color='info'>
                    <h4 className={classes.cardTitleWhite}>Patient Profile</h4>
                    <p className={classes.cardCategoryWhite}>View the detail of Patient</p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="service"
                          label="Service"
                          value="Hello World"
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>
                      
                      <GridItem xs={12} sm={12} md={6}>
                        <TextField
                          id="email"
                          label="Email"
                          value= {this.state.email}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>

                        <TextField
                          id="firstname"
                          label="First Name"
                          value= {this.state.firstname}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="lastname"
                          label="Last Name"
                          value= {this.state.lastname}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="post"
                          label="Post Code"
                          value={this.state.postcode}
                          className={classes.textField}
                          margin="normal"
                          InputProps={{
                            readOnly: true,
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
