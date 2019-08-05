import React from 'react'
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
import { updatePersonnel } from 'services/BackendService.js'
import avatar from 'assets/img/faces/marc.jpg'
import swal from 'sweetalert2'
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

class UserProfile extends React.Component {
  constructor (props) {
    super(props)
    const { classes } = props
    var details = JSON.parse(sessionStorage.personDetails)
    this.state = {
      classes: classes,
      details: details
    }
  }

  onSave () {
    var pass1 = document.getElementById('password1').value
    var pass2 = document.getElementById('password2').value
    // check if the password fields contain something
    if (pass1 !== '' || pass2 !== '') {
      // if they contain and they are not the same
      console.log(pass1)
      if (pass2 !== pass1) {
        document.getElementById('password1').style.backgroundColor = '#FEC2C2'
        document.getElementById('password2').style.backgroundColor = '#FEC2C2'
        swal.fire({
          type: 'error',
          title: 'Whoops..!',
          text: 'Passwords don\'t match! '
        })
      } else { // else add the password to the body
        var id=JSON.parse(sessionStorage.personDetails)._id
        var body = {
          id: id,
          body: {
            password: pass1
          }
        }
        updatePersonnel(body).then(response => {
          console.log(response)
          document.getElementById('password1').value = ''
          document.getElementById('password2').value = ''
          swal.fire({
            type: 'success',
            title: 'Success',
            text: 'The entry has been updated! '
          })
        })
      }
    }
  }

  render () {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={this.state.classes.cardTitleWhite}>Edit Profile</h4>
                <p className={this.state.classes.cardCategoryWhite}>Edit your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText='Role'
                      id='company-disabled'
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                      value={this.state.details.role}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText='Email address/Username'
                      id='email-address'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }

                      }
                      value={this.state.details.email}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText='First Name'
                      id='first-name'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      value={this.state.details.first_name}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText='Last Name'
                      id='last-name'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      value={this.state.details.last_name}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText='Organisation Name'
                      id='username'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      value={this.state.details.organisation_id.name}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText='Organisation Type'
                      id='username'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      value={this.state.details.organisation_id.role}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText='Organisation Address'
                      id='country'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      value={this.state.details.organisation_id.address1 + ' ' + this.state.details.organisation_id.address2}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText='Organisation postalcode'
                      id='postal-code'
                      formControlProps={{
                        fullWidth: true,
                        disabled: true
                      }}
                      value={this.state.details.organisation_id.postcode}
                    />
                  </GridItem>
                </GridContainer>
                <h3 >Change your password here:</h3>
                <GridContainer>

                  <GridItem xs={12} sm={12} md={4}>

                    <CustomInput
                      labelText='Password 1'
                      id='password1'
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText='Password 2'
                      id='password2'
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button onClick={this.onSave} color='primary'>Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={5} sm={5} md={2}>
            <Card profile>
              <CardAvatar profile>
                <a href='#pablo' onClick={e => e.preventDefault()}>
                  <img src={avatar} alt='...' />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={this.state.classes.cardCategory}>{this.state.details.role}</h6>
                <h4 className={this.state.classes.cardTitle}>{this.state.details.first_name + ' ' + this.state.details.last_name}</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(UserProfile)
