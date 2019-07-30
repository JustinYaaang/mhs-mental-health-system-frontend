import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'
import { getPersonnel, updatePersonnel, createPersonnel } from 'services/BackendService.js'
import swal from 'sweetalert2'

/**
 * Component that displays a form for a Trust Manager, Service Manager, Clinitian
 */
class PersonForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      hasDetails: this.props.hasDetails,
      organization:'trust'
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    console.log(this.state.hasDetails)
  }

  componentWillMount () {
    console.log(this.state.hasDetails)
    if (this.state.hasDetails) {
      console.log('in  person form' + this.state.id)
      getPersonnel(this.state.id).then(response => {
        console.log(response)
        document.getElementById('firstnameinput').value = response.first_name
        document.getElementById('lastnameinput').value = response.last_name
        document.getElementById('emailinput').value = response.email
        document.getElementById('passwordinput').value = response.password
        document.getElementById('trustnameinput_postcodeinput').value = response.role //! !!!
      })
    } else {
    }
  }

  onChange (event) {
  }

  onSave (event) {
    // get all the necessary details from the form
    var body = {
      id: this.state.id,
      body: {
        first_name: document.getElementById('firstnameinput').value,
        last_name: document.getElementById('lastnameinput').value,
        email: document.getElementById('emailinput').value,
        role: 'TRUSTMANAGER'

      }
    }
    var passwordFlag = false
    // get the 2 password fields
    var pass1 = document.getElementById('passwordchange1').value
    var pass2 = document.getElementById('passwordchange2').value
    // check if the password fields contain something
    if (pass1 !== '' || pass2 !== '') {
      // if they contain and they are not the same
      console.log(pass1)
      if (pass2 !== pass1) {
        document.getElementById('passwordchange1').style.backgroundColor = '#FEC2C2'
        swal.fire({
          type: 'error',
          title: 'Whoops..!',
          text: 'Passwords don\'t match! '
        })

        return
      } else { // else add the password to the body
        body.body.password = pass1
        body.body.organisation_id = sessionStorage.organizationID
        passwordFlag = true
      }
    }
    // Proceed only if all fields are filled
    if (!this.allFieldsCompleted()) {
      return
    }
    if (this.state.hasDetails) { // if we are in edit mode
      // send the details and clear the password field
      updatePersonnel(body).then(response => {
        console.log(response)
        document.getElementById('passwordchange1').value = ''
        document.getElementById('passwordchange2').value = ''
        swal.fire({
          type: 'success',
          title: 'Success',
          text: 'The entry has been updated! '
        })
      })
    } else { // if we create a new person
      if (passwordFlag) {
        createPersonnel(body.body).then(response => {
          this.componentWillMount()
          console.log(response)
          swal.fire({
            type: 'success',
            title: 'Success',
            text: 'The entry has been created! '
          })
        })
      } else {
        swal.fire({
          type: 'error',
          title: 'Error',
          text: 'Password error! '
        })
      }
    }
  }

  allFieldsCompleted () {
    var a = document.getElementById('firstnameinput').value
    var b = document.getElementById('lastnameinput').value
    var c = document.getElementById('emailinput').value
    if (a === '' || b === '' || c === '') {
      swal.fire({
        type: 'error',
        title: 'Whoops',
        text: 'Please fill all the fields '
      })
      return false
    }
    return true
  }

  render () {
    return (
      <form class='trustform'>
        <label className='label-subtitle' for='label'>Please enter the details of the NHS Person</label>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='firstnameinput' aria-describedby='emailHelp' placeholder='First Name' onChange={this.onChange} />
          <br />

          <input name='email' type='email' class='form-control' id='lastnameinput' aria-describedby='emailHelp' placeholder='Last Name' onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='emailinput' aria-describedby='emailHelp' placeholder='email' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='passwordinput' aria-describedby='emailHelp' placeholder='password' onChange={this.onChange} readOnly />
          <br />
          <input name='email' type='email' class='form-control' id='trustnameinput_postcodeinput' aria-describedby='emailHelp' placeholder='Trust Name' value={sessionStorage.organizationID} onChange={this.onChange} readOnly />
        </div>
        <br />
        <label className='label-subtitle' id='passwordlabel' for='label'>{this.state.hasDetails ? 'Change the password here:' : 'Enter password here:'}</label>
        <div>
          <input name='email' type='email' class='form-control' id='passwordchange1' aria-describedby='emailHelp' placeholder='Enter password' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='passwordchange2' aria-describedby='emailHelp' placeholder='Enter password again' onChange={this.onChange} />

        </div>
        <Button onClick={this.onSave} id='loginbutton' type='button' color='primary'>Save</Button>
      </form>
    )
  }
}

export default PersonForm

// id
// name
// address line 1
// address line 2
// post code
// description
// website link
// email
// telephone
